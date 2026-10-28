import QRCode from "qrcode";
import { DEFAULT_QR_STYLE, type QRContent, type QRStyle } from "./types";
import { serializeQRContent } from "./serializeContent";
import { validateQRContent } from "./validateContent";

export async function createQRCodeDataUrl(
    content: QRContent,
    style: QRStyle = DEFAULT_QR_STYLE,
): Promise<string> {
    const validationMessage = validateQRContent(content);
    if (validationMessage) throw new Error(validationMessage);

    const value = serializeQRContent(content);

    try {
        return await QRCode.toDataURL(value, {
            type: "image/png",
            errorCorrectionLevel: style.errorCorrectionLevel,
            margin: style.margin,
            width: style.pngWidth,
            color: { dark: style.foreground, light: style.background },
        });
    } catch (error) {
        if (error instanceof Error && /too big|too large|length/i.test(error.message)) {
            throw new Error("This content is too long for a QR Code. Shorten it and try again.");
        }
        throw error;
    }
}

export async function createQRCodeSvg(
    content: QRContent,
    style: QRStyle = DEFAULT_QR_STYLE,
): Promise<string> {
    const validationMessage = validateQRContent(content);
    if (validationMessage) throw new Error(validationMessage);

    const value = serializeQRContent(content);

    try {
        return await QRCode.toString(value, {
            type: "svg",
            errorCorrectionLevel: style.errorCorrectionLevel,
            margin: style.margin,
            color: { dark: style.foreground, light: style.background },
        });
    } catch (error) {
        if (error instanceof Error && /too big|too large|length/i.test(error.message)) {
            throw new Error("This content is too long for a QR Code. Shorten it and try again.");
        }
        throw error;
    }
}
