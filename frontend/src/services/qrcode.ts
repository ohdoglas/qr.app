import api from "../api";

export async function generateQRCode(url: string, isPrivate?: boolean) {
    const payLoad = { url };
    if (isPrivate !== undefined) {
        Object.assign(payLoad, { isPrivate });
    }
    const response = await api.post("/qrcode-generator", payLoad);
    return response.data;
}