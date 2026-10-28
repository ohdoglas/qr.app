import type { QRContent } from "./types";
import type { TranslationKey } from "../../i18n/translations";

export function normalizeInternationalPhone(value: string): string | null {
    const input = value.trim();
    if (!/^\+[\d\s().-]+$/.test(input)) return null;

    const digits = input.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15 || digits.startsWith("0")) return null;

    return `+${digits}`;
}

export function isValidEmailAddress(value: string): boolean {
    const address = value.trim();
    const separator = address.lastIndexOf("@");
    if (separator < 1 || separator === address.length - 1 || address.indexOf("@") !== separator) return false;

    const localPart = address.slice(0, separator);
    const domain = address.slice(separator + 1);
    if (
        localPart.length > 64 ||
        !/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart) ||
        localPart.startsWith(".") ||
        localPart.endsWith(".") ||
        localPart.includes("..")
    ) return false;

    try {
        const parsed = new URL(`https://${domain}`);
        return parsed.hostname.includes(".") &&
            !parsed.hostname.startsWith(".") &&
            !parsed.hostname.endsWith(".") &&
            parsed.pathname === "/" &&
            !parsed.search &&
            !parsed.hash &&
            !parsed.port &&
            !parsed.username &&
            !parsed.password;
    } catch {
        return false;
    }
}

function hasValue(value: string): boolean {
    return value.trim().length > 0;
}

export function validateQRContent(content: QRContent): TranslationKey | null {
    switch (content.kind) {
        case "url": {
            const value = content.value.trim();
            if (!value) return "validation.urlRequired";

            try {
                const parsed = new URL(value);
                if ((parsed.protocol !== "http:" && parsed.protocol !== "https:") || !parsed.hostname) {
                    return "validation.urlInvalid";
                }
            } catch {
                return "validation.urlInvalid";
            }
            return null;
        }
        case "text":
            return hasValue(content.value) ? null : "validation.textRequired";
        case "wifi": {
            const ssidBytes = new TextEncoder().encode(content.ssid).length;
            if (!hasValue(content.ssid)) return "validation.ssidRequired";
            if (ssidBytes > 32) return "validation.ssidTooLong";
            if (content.security !== "nopass" && !hasValue(content.password)) {
                return "validation.passwordRequired";
            }
            return null;
        }
        case "email":
            return isValidEmailAddress(content.address)
                ? null
                : "validation.emailInvalid";
        case "phone":
            return normalizeInternationalPhone(content.phone)
                ? null
                : "validation.phoneInvalid";
        case "sms":
        case "whatsapp":
            if (!normalizeInternationalPhone(content.phone)) {
                return "validation.phoneInvalid";
            }
            if (content.kind === "whatsapp" && !hasValue(content.message)) {
                return "validation.whatsappMessageRequired";
            }
            return null;
        case "vcard":
            if (!hasValue(content.givenName) || !hasValue(content.familyName)) {
                return "validation.contactNameRequired";
            }
            if (content.phone && !normalizeInternationalPhone(content.phone)) {
                return "validation.phoneInvalid";
            }
            if (content.email && !isValidEmailAddress(content.email)) {
                return "validation.contactEmailInvalid";
            }
            return null;
        default: {
            const exhaustiveCheck: never = content;
            return exhaustiveCheck;
        }
    }
}
