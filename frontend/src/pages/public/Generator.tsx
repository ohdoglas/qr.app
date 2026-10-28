import { useState, type FormEvent, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { useLanguage } from "../../i18n/useLanguage";
import type { TranslationKey } from "../../i18n/translations";
import { QR_TEMPLATES } from "../../features/generator/templateCatalog";
import "../../css/styles/public/Generator.css";
import { createQRCodeDataUrl, createQRCodeSvg } from "../../features/generator/qrCode";
import { getContrastRatio, isReadableQrColorPair } from "../../features/generator/contrast";
import { validateQRContent } from "../../features/generator/validateContent";
import { DEFAULT_QR_STYLE, EMPTY_QR_FORM_VALUES, type ContentKind, type QRContent, type QRFormValues, type QRStyle } from "../../features/generator/types";

const QR_PRESETS: Array<{ id: string; nameKey: TranslationKey; foreground: string; background: string }> = [
    { id: "classic", nameKey: "generator.presetClassic", foreground: "#000000", background: "#FFFFFF" },
    { id: "midnight", nameKey: "generator.presetMidnight", foreground: "#14213A", background: "#F5F7FC" },
    { id: "forest", nameKey: "generator.presetForest", foreground: "#14532D", background: "#F0FDF4" },
    { id: "indigo", nameKey: "generator.presetIndigo", foreground: "#312E81", background: "#EEF2FF" },
];

const CONTENT_TYPES: Array<{ kind: ContentKind; labelKey: TranslationKey; hintKey: TranslationKey }> = [
    { kind: "url", labelKey: "generator.url", hintKey: "generator.urlHint" },
    { kind: "text", labelKey: "generator.text", hintKey: "generator.textHint" },
    { kind: "wifi", labelKey: "generator.wifi", hintKey: "generator.wifiHint" },
    { kind: "email", labelKey: "generator.email", hintKey: "generator.emailHint" },
    { kind: "phone", labelKey: "generator.phone", hintKey: "generator.phoneHint" },
    { kind: "sms", labelKey: "generator.sms", hintKey: "generator.smsHint" },
    { kind: "whatsapp", labelKey: "generator.whatsapp", hintKey: "generator.whatsappHint" },
    { kind: "vcard", labelKey: "generator.vcard", hintKey: "generator.vcardHint" },
];

type GeneratorMessage = { key: TranslationKey };

function templateSelectionFromRoute(state: unknown): { kind: ContentKind; titleKey: TranslationKey } | null {
    if (typeof state !== "object" || state === null || !("templateKind" in state)) return null;
    const kind = state.templateKind;
    if (typeof kind !== "string" || !CONTENT_TYPES.some((item) => item.kind === kind)) return null;
    const templateId = "templateId" in state && typeof state.templateId === "string" ? state.templateId : "";
    const template = QR_TEMPLATES.find((item) => item.id === templateId && item.kind === kind);
    return template ? { kind: kind as ContentKind, titleKey: template.titleKey } : null;
}

function contentFromForm(kind: ContentKind, values: QRFormValues): QRContent {
    switch (kind) {
        case "url": return { kind, value: values.url };
        case "text": return { kind, value: values.text };
        case "wifi": return {
            kind,
            ssid: values.wifiSsid,
            password: values.wifiPassword,
            security: values.wifiSecurity,
            hidden: values.wifiHidden,
        };
        case "email": return { kind, address: values.emailAddress, subject: values.emailSubject, body: values.emailBody };
        case "phone": return { kind, phone: values.phoneNumber };
        case "sms": return { kind, phone: values.smsPhone, body: values.smsBody };
        case "whatsapp": return { kind, phone: values.whatsappPhone, message: values.whatsappMessage };
        case "vcard": return {
            kind,
            givenName: values.vcardGivenName,
            familyName: values.vcardFamilyName,
            organization: values.vcardOrganization,
            phone: values.vcardPhone,
            email: values.vcardEmail,
        };
    }
}

const Generator = () => {
    const { language, t } = useLanguage();
    const location = useLocation();
    const templateSelection = templateSelectionFromRoute(location.state);
    const [contentKind, setContentKind] = useState<ContentKind>(templateSelection?.kind ?? "url");
    const [formValues, setFormValues] = useState<QRFormValues>(EMPTY_QR_FORM_VALUES);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [qrStyle, setQrStyle] = useState<QRStyle>(DEFAULT_QR_STYLE);
    const [message, setMessage] = useState<GeneratorMessage>(templateSelection
        ? { key: "generator.templateSelected" }
        : { key: "generator.urlHint" });
    const [isGenerating, setIsGenerating] = useState(false);
    const contrastRatio = getContrastRatio(qrStyle.foreground, qrStyle.background);
    const hasSafeContrast = isReadableQrColorPair(qrStyle.foreground, qrStyle.background);

    const updateStyle = (updates: Partial<QRStyle>) => {
        setQrStyle((current) => ({ ...current, ...updates }));
        setImageUrl(null);
        setMessage({ key: "generator.appearanceChanged" });
    };

    const handleContentKindChange = (kind: ContentKind) => {
        setContentKind(kind);
        setFormValues(EMPTY_QR_FORM_VALUES);
        setImageUrl(null);
        setMessage({ key: CONTENT_TYPES.find((item) => item.kind === kind)!.hintKey });
    };

    const handleFieldChange = (field: keyof QRFormValues, value: string | boolean) => {
        setFormValues((current) => ({ ...current, [field]: value }));
        setImageUrl(null);
        setMessage({ key: "generator.contentChanged" });
    };

    const handleGenerate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const content = contentFromForm(contentKind, formValues);
        const validationMessage = validateQRContent(content);

        setImageUrl(null);
        if (validationMessage) {
            setMessage({ key: validationMessage });
            return;
        }

        setIsGenerating(true);
        setMessage({ key: "generator.creating" });
        try {
            const dataUrl = await createQRCodeDataUrl(content, qrStyle);
            setImageUrl(dataUrl);
            setMessage({ key: "generator.ready" });
        } catch (error) {
            setMessage({ key: error instanceof Error && /too big|too large|length|too long/i.test(error.message) ? "generator.tooLong" : "generator.createError" });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadSvg = async () => {
        const content = contentFromForm(contentKind, formValues);
        const validationMessage = validateQRContent(content);
        if (validationMessage) {
            setMessage({ key: validationMessage });
            return;
        }

        try {
            const svg = await createQRCodeSvg(content, qrStyle);
            const objectUrl = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
            const link = document.createElement("a");
            link.href = objectUrl;
            link.download = `qrapp-${contentKind}-qrcode.svg`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
            setMessage({ key: "generator.svgReady" });
        } catch (error) {
            setMessage({ key: error instanceof Error && /too big|too large|length|too long/i.test(error.message) ? "generator.tooLong" : "generator.svgError" });
        }
    };

    const inputField = (
        id: string,
        label: string,
        field: keyof QRFormValues,
        options: { type?: string; placeholder?: string; required?: boolean; autoComplete?: string } = {},
    ): ReactNode => (
        <div className="generator-field">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={options.type ?? "text"}
                placeholder={options.placeholder}
                value={String(formValues[field])}
                onChange={(event) => handleFieldChange(field, event.target.value)}
                autoComplete={options.autoComplete}
                disabled={isGenerating}
                required={options.required}
            />
        </div>
    );

    const textAreaField = (
        id: string,
        label: string,
        field: keyof QRFormValues,
        placeholder: string,
        required = false,
        rows = 3,
    ): ReactNode => (
        <div className="generator-field">
            <label htmlFor={id}>{label}</label>
            <textarea
                id={id}
                rows={rows}
                placeholder={placeholder}
                value={String(formValues[field])}
                onChange={(event) => handleFieldChange(field, event.target.value)}
                disabled={isGenerating}
                required={required}
            />
        </div>
    );

    const phoneHelp = <p className="generator-help">{t("generator.phoneHelp")}</p>;

    let contextualFields: ReactNode;
    switch (contentKind) {
        case "url":
            contextualFields = <>
                {inputField("qr-url", t("generator.webAddress"), "url", { type: "url", placeholder: "https://example.com", required: true, autoComplete: "url" })}
                <p className="generator-help">{t("generator.urlHelp")}</p>
            </>;
            break;
        case "text":
            contextualFields = <>
                {textAreaField("qr-text", t("generator.textContent"), "text", t("generator.textPlaceholder"), true, 4)}
                <p className="generator-help">{t("generator.textHelp")}</p>
            </>;
            break;
        case "wifi":
            contextualFields = <>
                {inputField("wifi-ssid", t("generator.networkName"), "wifiSsid", { placeholder: t("generator.networkPlaceholder"), required: true })}
                <div className="generator-field">
                    <label htmlFor="wifi-security">{t("generator.security")}</label>
                    <select
                        id="wifi-security"
                        value={formValues.wifiSecurity}
                        onChange={(event) => handleFieldChange("wifiSecurity", event.target.value as QRFormValues["wifiSecurity"])}
                        disabled={isGenerating}
                    >
                        <option value="WPA">WPA / WPA2 / WPA3</option>
                        <option value="WEP">{t("generator.wep")}</option>
                        <option value="nopass">{t("generator.openNetwork")}</option>
                    </select>
                </div>
                {formValues.wifiSecurity !== "nopass" && inputField("wifi-password", t("generator.networkPassword"), "wifiPassword", { type: "password", placeholder: t("generator.passwordPlaceholder"), required: true, autoComplete: "new-password" })}
                <label className="generator-checkbox">
                    <input
                        type="checkbox"
                        checked={formValues.wifiHidden}
                        onChange={(event) => handleFieldChange("wifiHidden", event.target.checked)}
                        disabled={isGenerating}
                    />
                    <span>{t("generator.hiddenNetwork")}</span>
                </label>
                <p className="generator-help">{t("generator.wifiHelp")}</p>
            </>;
            break;
        case "email":
            contextualFields = <>
                {inputField("email-address", t("generator.emailAddress"), "emailAddress", { type: "email", placeholder: "name@example.com", required: true, autoComplete: "email" })}
                {inputField("email-subject", t("generator.subjectOptional"), "emailSubject", { placeholder: t("generator.subjectPlaceholder") })}
                {textAreaField("email-body", t("generator.messageOptional"), "emailBody", t("generator.shortMessagePlaceholder"))}
                <p className="generator-help">{t("generator.emailHelp")}</p>
            </>;
            break;
        case "phone":
            contextualFields = <>
                {inputField("phone-number", t("generator.phoneNumber"), "phoneNumber", { type: "tel", placeholder: "+5511999999999", required: true, autoComplete: "tel" })}
                {phoneHelp}
                <p className="generator-help">{t("generator.phoneHelpText")}</p>
            </>;
            break;
        case "sms":
            contextualFields = <>
                {inputField("sms-phone", t("generator.phoneNumber"), "smsPhone", { type: "tel", placeholder: "+5511999999999", required: true, autoComplete: "tel" })}
                {phoneHelp}
                {textAreaField("sms-body", t("generator.messageOptional"), "smsBody", t("generator.shortMessagePlaceholder"))}
                <p className="generator-help">{t("generator.smsHelp")}</p>
            </>;
            break;
        case "whatsapp":
            contextualFields = <>
                {inputField("whatsapp-phone", t("generator.whatsappNumber"), "whatsappPhone", { type: "tel", placeholder: "+5511999999999", required: true, autoComplete: "tel" })}
                {phoneHelp}
                {textAreaField("whatsapp-message", t("generator.prefilledMessage"), "whatsappMessage", t("generator.whatsappPlaceholder"), true)}
                <p className="generator-help">{t("generator.whatsappHelp")}</p>
            </>;
            break;
        case "vcard":
            contextualFields = <>
                <div className="generator-field-row">
                    {inputField("vcard-given-name", t("generator.firstName"), "vcardGivenName", { placeholder: t("generator.firstName"), required: true, autoComplete: "given-name" })}
                    {inputField("vcard-family-name", t("generator.lastName"), "vcardFamilyName", { placeholder: t("generator.lastName"), required: true, autoComplete: "family-name" })}
                </div>
                {inputField("vcard-organization", t("generator.organizationOptional"), "vcardOrganization", { placeholder: t("generator.companyPlaceholder"), autoComplete: "organization" })}
                {inputField("vcard-phone", t("generator.phoneOptional"), "vcardPhone", { type: "tel", placeholder: "+5511999999999", autoComplete: "tel" })}
                {inputField("vcard-email", t("generator.contactEmailOptional"), "vcardEmail", { type: "email", placeholder: "nome@example.com", autoComplete: "email" })}
                <p className="generator-help">{t("generator.vcardHelp")}</p>
            </>;
    }

    return (
        <div className="generator-page">
            <Header />
            <main className="generator-main">
                <section className="generator-card" aria-labelledby="generator-title">
                    <div className="generator-copy">
                        <p className="generator-eyebrow">{t("generator.eyebrow")}</p>
                        <h1 id="generator-title">{t("generator.title")}</h1>
                        <p className="generator-intro">{t("generator.intro")}</p>
                        <form className="generator-form" onSubmit={handleGenerate} noValidate>
                            <fieldset className="generator-type-selector" disabled={isGenerating}>
                                <legend>{t("generator.contentType")}</legend>
                                {CONTENT_TYPES.map(({ kind, labelKey }) => (
                                    <label className={contentKind === kind ? "is-selected" : ""} key={kind}>
                                        <input
                                            type="radio"
                                            name="content-kind"
                                            value={kind}
                                            checked={contentKind === kind}
                                            onChange={() => handleContentKindChange(kind)}
                                        />
                                        <span>{t(labelKey)}</span>
                                    </label>
                                ))}
                            </fieldset>

                            <div className="generator-contextual-fields" key={contentKind}>
                                {contextualFields}
                            </div>
                            <fieldset className="generator-style-controls" disabled={isGenerating}>
                                <legend>{t("generator.appearanceExport")}</legend>
                                <div className="generator-presets" aria-label={t("generator.presets")}>
                                    {QR_PRESETS.map((preset) => (
                                        <button
                                            type="button"
                                            className="generator-preset"
                                            key={preset.id}
                                            onClick={() => updateStyle({ foreground: preset.foreground, background: preset.background })}
                                            aria-label={t("generator.presetLabel", { name: t(preset.nameKey) })}
                                        >
                                            <span aria-hidden="true" style={{ background: preset.background, color: preset.foreground }}>Aa</span>
                                            {t(preset.nameKey)}
                                        </button>
                                    ))}
                                </div>
                                <div className="generator-style-row">
                                    <div className="generator-field">
                                        <label htmlFor="qr-foreground">{t("generator.foreground")}</label>
                                        <input id="qr-foreground" type="color" value={qrStyle.foreground} onChange={(event) => updateStyle({ foreground: event.target.value.toUpperCase() })} />
                                    </div>
                                    <div className="generator-field">
                                        <label htmlFor="qr-background">{t("generator.background")}</label>
                                        <input id="qr-background" type="color" value={qrStyle.background} onChange={(event) => updateStyle({ background: event.target.value.toUpperCase() })} />
                                    </div>
                                    <div className="generator-field">
                                        <label htmlFor="qr-correction">{t("generator.errorCorrection")}</label>
                                        <select id="qr-correction" value={qrStyle.errorCorrectionLevel} onChange={(event) => updateStyle({ errorCorrectionLevel: event.target.value as QRStyle["errorCorrectionLevel"] })}>
                                            <option value="M">{t("generator.medium")}</option>
                                            <option value="Q">{t("generator.quartile")}</option>
                                            <option value="H">{t("generator.high")}</option>
                                        </select>
                                    </div>
                                    <div className="generator-field">
                                        <label htmlFor="qr-quiet-zone">{t("generator.quietZone")}</label>
                                        <select id="qr-quiet-zone" value={qrStyle.margin} onChange={(event) => updateStyle({ margin: Number(event.target.value) })}>
                                            <option value={4}>{t("generator.modulesMinimum")}</option>
                                            <option value={6}>{t("generator.modules", { count: 6 })}</option>
                                            <option value={8}>{t("generator.modules", { count: 8 })}</option>
                                        </select>
                                    </div>
                                    <div className="generator-field">
                                        <label htmlFor="qr-png-width">{t("generator.pngResolution")}</label>
                                        <select id="qr-png-width" value={qrStyle.pngWidth} onChange={(event) => updateStyle({ pngWidth: Number(event.target.value) })}>
                                            <option value={512}>{t("generator.px", { count: 512 })}</option>
                                            <option value={1024}>{t("generator.px", { count: 1024 })}</option>
                                            <option value={2048}>{t("generator.px", { count: 2048 })}</option>
                                        </select>
                                    </div>
                                </div>
                                <p className={`generator-contrast ${hasSafeContrast ? "is-safe" : "is-warning"}`} role="status" aria-live="polite">
                                    {t("generator.contrastRatio", {
                                        ratio: new Intl.NumberFormat(language === "pt" ? "pt-BR" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(contrastRatio),
                                        message: t(hasSafeContrast ? "generator.contrastSafe" : "generator.contrastWarning"),
                                    })}
                                </p>
                                <p className="generator-help">{t("generator.styleHelp")}</p>
                            </fieldset>
                            <button className="generator_button" type="submit" disabled={isGenerating || !hasSafeContrast}>
                                {isGenerating ? t("generator.generating") : t("generator.generate")}
                            </button>
                        </form>
                    </div>

                    <div className="generator-preview" aria-label={t("generator.preview")}>
                        {imageUrl ? (
                            <>
                                <img
                                    src={imageUrl}
                                    alt={t("generator.previewFor", { type: t(CONTENT_TYPES.find((item) => item.kind === contentKind)!.labelKey) })}
                                    className="qrcode-image"
                                    style={{ backgroundColor: qrStyle.background }}
                                />
                                <div className="generator-download-actions">
                                    <a className="generator-download" href={imageUrl} download={`qrapp-${contentKind}-${qrStyle.pngWidth}px.png`}>
                                        {t("generator.downloadPng", { size: qrStyle.pngWidth })}
                                    </a>
                                    <button className="generator-download generator-download-secondary" type="button" onClick={handleDownloadSvg} disabled={!hasSafeContrast}>
                                        {t("generator.downloadSvg")}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="generator-placeholder" aria-hidden="true">
                                <span className="placeholder-corner placeholder-corner-top-left" />
                                <span className="placeholder-corner placeholder-corner-top-right" />
                                <span className="placeholder-corner placeholder-corner-bottom-left" />
                                <span className="placeholder-pixels">QR</span>
                            </div>
                        )}
                        <p id="qr-status" className="generator-status" role="status" aria-live="polite" aria-atomic="true">
                            {message.key === "generator.templateSelected" && templateSelection
                                ? t(message.key, { title: t(templateSelection.titleKey) })
                                : message.key === "generator.ready" || message.key === "generator.contentChanged"
                                    ? t(message.key, { type: t(CONTENT_TYPES.find((item) => item.kind === contentKind)!.labelKey) })
                                    : t(message.key)}
                        </p>
                    </div>
                </section>
                <p className="generator-privacy-note">
                    {t("generator.privacy")}
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default Generator;
