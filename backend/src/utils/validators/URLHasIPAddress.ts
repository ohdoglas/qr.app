export default function hasSuspiciousIPLikePattern(url: string): boolean {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;

        const ipLikeRegex = /(?:\d{1,3}\.){3}\d{1,3}/;

        return ipLikeRegex.test(hostname);
    } catch (error) {
        console.error(error);
        return false;
    }
}