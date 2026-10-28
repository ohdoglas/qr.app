export type ContentKind = "url" | "text" | "wifi" | "email" | "phone" | "sms" | "whatsapp" | "vcard";
export type WifiSecurity = "WPA" | "WEP" | "nopass";

export type QRFormValues = {
    url: string;
    text: string;
    wifiSsid: string;
    wifiPassword: string;
    wifiSecurity: WifiSecurity;
    wifiHidden: boolean;
    emailAddress: string;
    emailSubject: string;
    emailBody: string;
    phoneNumber: string;
    smsPhone: string;
    smsBody: string;
    whatsappPhone: string;
    whatsappMessage: string;
    vcardGivenName: string;
    vcardFamilyName: string;
    vcardOrganization: string;
    vcardPhone: string;
    vcardEmail: string;
};

export const EMPTY_QR_FORM_VALUES: QRFormValues = {
    url: "",
    text: "",
    wifiSsid: "",
    wifiPassword: "",
    wifiSecurity: "WPA",
    wifiHidden: false,
    emailAddress: "",
    emailSubject: "",
    emailBody: "",
    phoneNumber: "",
    smsPhone: "",
    smsBody: "",
    whatsappPhone: "",
    whatsappMessage: "",
    vcardGivenName: "",
    vcardFamilyName: "",
    vcardOrganization: "",
    vcardPhone: "",
    vcardEmail: "",
};

export type QRContent =
    | { kind: "url"; value: string }
    | { kind: "text"; value: string }
    | { kind: "wifi"; ssid: string; password: string; security: WifiSecurity; hidden: boolean }
    | { kind: "email"; address: string; subject: string; body: string }
    | { kind: "phone"; phone: string }
    | { kind: "sms"; phone: string; body: string }
    | { kind: "whatsapp"; phone: string; message: string }
    | { kind: "vcard"; givenName: string; familyName: string; organization: string; phone: string; email: string };

export type QRStyle = {
    foreground: string;
    background: string;
    margin: number;
    errorCorrectionLevel: "L" | "M" | "Q" | "H";
    pngWidth: number;
};

export const DEFAULT_QR_STYLE: QRStyle = {
    foreground: "#000000",
    background: "#FFFFFF",
    margin: 4,
    errorCorrectionLevel: "M",
    pngWidth: 1024,
};
