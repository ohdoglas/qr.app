import supabase from "../config/supabase";

export async function imgUp(
    pathWithName: string,
    buffer: Buffer,
    mimeType: string
) {
    const { error, data } = await supabase.storage.from('qrappqrcodes').upload(pathWithName, buffer, {
        contentType: mimeType,
        upsert: false,
    });

    if (error) {
        return null;
    }

    return data;
}
