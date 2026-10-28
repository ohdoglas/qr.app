import { mkdir, writeFile } from "fs/promises";
import path from "path";
import getSupabaseClient from "../config/supabase";
import { imgUp } from "./imgUpload";

const localQRCodeDirectory = path.resolve(__dirname, "../../uploads/qrcodes");
const storageBucket = "qrappqrcodes";
export const QR_CODE_SIGNED_URL_TTL_SECONDS = 60 * 60;

function getStorageObjectPath(imageReference: string): string | null {
    if (!/^https?:\/\//i.test(imageReference)) {
        return imageReference.replace(/^\/+/, "");
    }

    try {
        const pathname = new URL(imageReference).pathname;
        const prefix = `/storage/v1/object/public/${storageBucket}/`;
        const signedPrefix = `/storage/v1/object/sign/${storageBucket}/`;
        const matchingPrefix = [prefix, signedPrefix].find((candidate) => pathname.startsWith(candidate));

        return matchingPrefix
            ? decodeURIComponent(pathname.slice(matchingPrefix.length))
            : null;
    } catch {
        return null;
    }
}

export async function resolveQRCodeImageUrl(imageReference: string): Promise<string> {
    if (isLocalQRCodeStorage()) {
        return imageReference;
    }

    const objectPath = getStorageObjectPath(imageReference);
    if (!objectPath) {
        return imageReference;
    }

    const { data, error } = await getSupabaseClient()
        .storage
        .from(storageBucket)
        .createSignedUrl(objectPath, QR_CODE_SIGNED_URL_TTL_SECONDS);

    if (error || !data?.signedUrl) {
        throw new Error("Supabase Storage could not create a temporary QR Code image URL.");
    }

    return data.signedUrl;
}

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

        return uploadedImage.path;
    }

    throw new Error(`Unsupported QR_STORAGE_PROVIDER: ${provider}`);
}

export function isLocalQRCodeStorage(): boolean {
    return (process.env.QR_STORAGE_PROVIDER || "supabase").toLowerCase() === "local";
}
