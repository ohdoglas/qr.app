import dotenv from "dotenv";
import path from "path";
import axios from "axios";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const API_KEY = process.env.GOOGLE_SAFE_BROWSING_KEY;

console.log(API_KEY);

export async function isMaliciousURL(url: string): Promise<boolean> {
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
        console.error(`Error while verifying:`, error.response?.data || error.message);
        return false;
    }
}

(async () => {
    const result = await isMaliciousURL("https://www.google.com.br");
    console.log("É maliciosa?", result);
})();
