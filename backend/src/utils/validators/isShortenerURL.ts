const knownShorteners = new Set([
    "bit.ly",
    "t.co",
    "goo.gl",
    "tinyurl.com",
    "ow.ly",
    "shorte.st",
    "adf.ly",
    "is.gd",
    "buff.ly",
    "tiny.cc",
    "cutt.ly",
    "rebrand.ly",
    "qr.ae",
    "lnkd.in",
    "bl.ink"
]);

export default function isShortenerURL(url: string): boolean {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname.toLowerCase();

        const domain = hostname.startsWith("www.") ? hostname.slice(4) : hostname;

        return knownShorteners.has(domain);
    } catch (error) {
        console.error(error);
        throw new Error(`Error while shortener URL check: ${error}`);
    }
}