import { normalizeInternationalPhone } from "./validateContent";
import type { QRContent } from "./types";

function normalizeLineBreaks(value: string): string {
    return value.replace(/\r\n|\r|\n/g, "\r\n");
}

function escapeWifiValue(value: string): string {
    return value.replace(/[\\;,:"]/g, "\\$&");
}

function escapeVCardValue(value: string): string {
    return value
        .replace(/\\/g, "\\\\")
        .replace(/\r\n|\r|\n/g, "\\n")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,");
}

function normalizeEmailDomain(address: string): string {
    const separator = address.lastIndexOf("@");
    const localPart = address.slice(0, separator);
    const domain = address.slice(separator + 1);
    const asciiDomain = new URL(`https://${domain}`).hostname;
    return `${encodeURIComponent(localPart)}@${asciiDomain}`;
}

export function serializeQRContent(content: QRContent): string {
    switch (content.kind) {
        case "url":
            return content.value.trim();
        case "text":
            return content.value;
        case "wifi": {
            const fields = [
                `T:${content.security}`,
                `S:${escapeWifiValue(content.ssid)}`,
            ];
            if (content.security !== "nopass") fields.push(`P:${escapeWifiValue(content.password)}`);
            if (content.hidden) fields.push("H:true");
            return `WIFI:${fields.join(";")};;`;
        }
        case "email": {
            const headers: string[] = [];
            if (content.subject) headers.push(`subject=${encodeURIComponent(content.subject)}`);
            if (content.body) headers.push(`body=${encodeURIComponent(normalizeLineBreaks(content.body))}`);
            const query = headers.length ? `?${headers.join("&")}` : "";
            return `mailto:${normalizeEmailDomain(content.address.trim())}${query}`;
        }
        case "phone":
            return `tel:${normalizeInternationalPhone(content.phone) ?? content.phone.trim()}`;
        case "sms": {
            const phone = normalizeInternationalPhone(content.phone) ?? content.phone.trim();
            const body = content.body
                ? `?body=${encodeURIComponent(normalizeLineBreaks(content.body))}`
                : "";
            return `sms:${phone}${body}`;
        }
        case "whatsapp": {
            const phone = (normalizeInternationalPhone(content.phone) ?? content.phone.trim()).replace(/\D/g, "");
            return `https://wa.me/${phone}?text=${encodeURIComponent(content.message)}`;
        }
        case "vcard": {
            const fullName = `${content.givenName.trim()} ${content.familyName.trim()}`.trim();
            const fields = [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `N:${escapeVCardValue(content.familyName.trim())};${escapeVCardValue(content.givenName.trim())};;;`,
                `FN:${escapeVCardValue(fullName)}`,
            ];
            if (content.organization.trim()) fields.push(`ORG:${escapeVCardValue(content.organization.trim())}`);
            if (content.phone.trim()) fields.push(`TEL;TYPE=CELL:${normalizeInternationalPhone(content.phone) ?? content.phone.trim()}`);
            if (content.email.trim()) fields.push(`EMAIL:${escapeVCardValue(content.email.trim())}`);
            fields.push("END:VCARD");
            return fields.join("\r\n");
        }
        default: {
            const exhaustiveCheck: never = content;
            return exhaustiveCheck;
        }
    }
}
