import { mkdir, writeFile } from "fs/promises";
import path from "path";
import getSupabaseClient from "../config/supabase";
import { imgUp } from "./imgUpload";

const localQRCodeDirectory = path.resolve(__dirname, "../../uploads/qrcodes");

export async function storeQRCode(fileName: string, buffer: Buffer): Promise<string> {
    const provider = (process.env.QR_STORAGE_PROVIDER || "supabase").toLowerCase();

    if (provider === "local") {
        await mkdir(localQRCodeDirectory, { recursive: true });
        await writeFile(path.join(localQRCodeDirectory, fileName), buffer, { flag: "wx" });

        const port = process.env.SERVER_PORT || "3000";
        const baseURL = (process.env.LOCAL_BASE_URL || `http://127.0.0.1:${port}`).replace(/\/$/, "");
        return `${baseURL}/uploads/qrcodes/${encodeURIComponent(fileName)}`;
    }

    if (provider === "supabase") {
        const uploadPath = `QRCodeImage/${fileName}`;
        const uploadedImage = await imgUp(uploadPath, buffer, "image/png");

        if (!uploadedImage) {
            throw new Error("Supabase Storage could not save the QR Code image.");
        }

        return getSupabaseClient().storage.from("qrappqrcodes").getPublicUrl(uploadedImage.path).data.publicUrl;
    }

    throw new Error(`Unsupported QR_STORAGE_PROVIDER: ${provider}`);
}

export function isLocalQRCodeStorage(): boolean {
    return (process.env.QR_STORAGE_PROVIDER || "supabase").toLowerCase() === "local";
}
