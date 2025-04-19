import supabase from "../config/supabase";

export async function imgUp(
    pathWithName: string,
    buffer: Buffer,
    mimeType: string
) {
    const ext = pathWithName.split('.').pop();

    const newName = `${pathWithName.replace(`.${ext}`, "")}_${new Date().getTime()}.${ext}`;

    const { error, data} = await supabase.storage.from('qrappqrcodes').upload(newName, buffer, {
        contentType: mimeType,
    });

    if (error) {
        return null;
    }

    return data;
}