import dotenv from "dotenv";
import path from "path";
import axios from "axios";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const API_KEY = process.env.GOOGLE_SAFE_BROWSING_KEY;

export async function isMaliciousURL(url: string): Promise<boolean> {
    if (!API_KEY) {
        throw new Error("GOOGLE_SAFE_BROWSING_KEY is required when Google Safe Browsing is enabled.");
    }

    try {
        const res = await axios.post(
            `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
            {
                client: {
                    clientId: "qrapp",
                    clientVersion: "1.0.0",
                },
                threatInfo: {
                    threatTypes: [
                        "MALWARE",
                        "SOCIAL_ENGINEERING",
                        "UNWANTED_SOFTWARE",
                        "POTENTIALLY_HARMFUL_APPLICATION",
                    ],
                    platformTypes: ["ANY_PLATFORM"],
                    threatEntryTypes: ["URL"],
                    threatEntries: [{ url }],
                },
            }
        );

        const hasThreats = res.data && Object.keys(res.data).length > 0;
        return hasThreats;
    } catch (error: any) {
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        console.error(`Google Safe Browsing request failed${status ? ` (HTTP ${status})` : ""}.`);
        throw new Error("Google Safe Browsing verification is unavailable.");
    }
}
