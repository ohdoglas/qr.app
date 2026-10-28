import type { TranslationKey } from "../../i18n/translations";
import type { ContentKind } from "./types";

export type QRTemplate = {
    id: string;
    titleKey: TranslationKey;
    kind: ContentKind;
    descriptionKey: TranslationKey;
    samplePayloadKey: TranslationKey;
    noteKey: TranslationKey;
};

export const QR_TEMPLATES: QRTemplate[] = [
    { id: "website-link", titleKey: "template.website.title", kind: "url", descriptionKey: "template.website.description", samplePayloadKey: "template.website.payload", noteKey: "template.website.note" },
    { id: "short-message", titleKey: "template.text.title", kind: "text", descriptionKey: "template.text.description", samplePayloadKey: "template.text.payload", noteKey: "template.text.note" },
    { id: "guest-wifi", titleKey: "template.wifi.title", kind: "wifi", descriptionKey: "template.wifi.description", samplePayloadKey: "template.wifi.payload", noteKey: "template.wifi.note" },
    { id: "email-contact", titleKey: "template.email.title", kind: "email", descriptionKey: "template.email.description", samplePayloadKey: "template.email.payload", noteKey: "template.email.note" },
    { id: "phone-call", titleKey: "template.phone.title", kind: "phone", descriptionKey: "template.phone.description", samplePayloadKey: "template.phone.payload", noteKey: "template.phone.note" },
    { id: "text-message", titleKey: "template.sms.title", kind: "sms", descriptionKey: "template.sms.description", samplePayloadKey: "template.sms.payload", noteKey: "template.sms.note" },
    { id: "whatsapp-chat", titleKey: "template.whatsapp.title", kind: "whatsapp", descriptionKey: "template.whatsapp.description", samplePayloadKey: "template.whatsapp.payload", noteKey: "template.whatsapp.note" },
    { id: "share-contact", titleKey: "template.vcard.title", kind: "vcard", descriptionKey: "template.vcard.description", samplePayloadKey: "template.vcard.payload", noteKey: "template.vcard.note" },
];
