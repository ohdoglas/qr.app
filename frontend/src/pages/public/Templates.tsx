import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { QR_TEMPLATES } from "../../features/generator/templateCatalog";
import type { ContentKind } from "../../features/generator/types";
import { useLanguage } from "../../i18n/useLanguage";
import type { TranslationKey } from "../../i18n/translations";
import "../../css/styles/public/Templates.css";

const CONTENT_KIND_LABELS: Record<ContentKind, TranslationKey> = {
    url: "generator.url",
    text: "generator.text",
    wifi: "generator.wifi",
    email: "generator.email",
    phone: "generator.phone",
    sms: "generator.sms",
    whatsapp: "generator.whatsapp",
    vcard: "generator.vcard",
};

const Templates = () => {
    const { language, t } = useLanguage();
    const [search, setSearch] = useState("");
    const [kindFilter, setKindFilter] = useState<ContentKind | "all">("all");
    const filteredTemplates = useMemo(() => {
        const normalizedSearch = search.trim().toLocaleLowerCase();
        return QR_TEMPLATES.filter((template) => {
            const matchesKind = kindFilter === "all" || template.kind === kindFilter;
            const searchableText = [
                t(template.titleKey),
                t(template.descriptionKey),
                t(template.noteKey),
                t(CONTENT_KIND_LABELS[template.kind]),
                t(template.samplePayloadKey),
            ].join(" ").toLocaleLowerCase();
            return matchesKind && (!normalizedSearch || searchableText.includes(normalizedSearch));
        });
    }, [kindFilter, search, t]);
    const countLabel = filteredTemplates.length === 1 ? "templates.exampleOne" : "templates.exampleMany";

    return (
        <div className="templates-page">
            <Header />
            <main className="templates-main">
                <section className="templates-heading" aria-labelledby="templates-title">
                    <p className="templates-eyebrow">{t("templates.eyebrow")}</p>
                    <h1 id="templates-title">{t("templates.title")}</h1>
                    <p>{t("templates.intro")}</p>
                </section>

                <section className="templates-library" aria-label={t("templates.library")}>
                    <div className="templates-filters">
                        <div className="templates-field">
                            <label htmlFor="template-search">{t("templates.search")}</label>
                            <input
                                id="template-search"
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder={t("templates.searchPlaceholder")}
                            />
                        </div>
                        <div className="templates-field">
                            <label htmlFor="template-kind">{t("templates.filter")}</label>
                            <select id="template-kind" value={kindFilter} onChange={(event) => setKindFilter(event.target.value as ContentKind | "all")}>
                                <option value="all">{t("templates.allFormats")}</option>
                                {Object.entries(CONTENT_KIND_LABELS).map(([kind, label]) => (
                                    <option key={kind} value={kind}>{t(label)}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <p className="templates-result-count" role="status" aria-live="polite">
                        {new Intl.NumberFormat(language === "pt" ? "pt-BR" : "en-US").format(filteredTemplates.length)} {t(countLabel)}
                    </p>

                    {filteredTemplates.length > 0 ? (
                        <div className="templates-grid">
                            {filteredTemplates.map((template) => (
                                <article className="template-card" key={template.id}>
                                    <div className="template-card-heading">
                                        <span className="template-type">{t(CONTENT_KIND_LABELS[template.kind])}</span>
                                        <span className="template-qr-mark" aria-hidden="true">QR</span>
                                    </div>
                                    <h2>{t(template.titleKey)}</h2>
                                    <p className="template-description">{t(template.descriptionKey)}</p>
                                    <div className="template-payload">
                                        <span>{t("templates.exampleFormat")}</span>
                                        <code>{t(template.samplePayloadKey)}</code>
                                    </div>
                                    <p className="template-note">{t(template.noteKey)}</p>
                                    <Link
                                        className="template-action"
                                        to="/generator"
                                        state={{ templateKind: template.kind, templateId: template.id }}
                                    >
                                        {t("templates.configure", { type: t(CONTENT_KIND_LABELS[template.kind]) })}
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="templates-empty">
                            <h2>{t("templates.noMatches")}</h2>
                            <p>{t("templates.noMatchesHelp")}</p>
                            <button type="button" onClick={() => { setSearch(""); setKindFilter("all"); }}>{t("templates.clearFilters")}</button>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Templates;
