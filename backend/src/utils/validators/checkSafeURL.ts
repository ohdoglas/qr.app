import xss from "xss";

export default function sanitizeURL(url: string) {
    try {
        const safeURL = xss(url);

        return safeURL;
    } catch (error) {
        console.error(error);
        throw new Error(`Error while sanitize URL: ${error}`);
    }
}