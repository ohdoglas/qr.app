import { NextFunction, Request, Response } from "express";
import QRCODEMSG from "../utils/messages/qrCodeMessages";
import validateURL from "../utils/validators/validateURL";
import isShortenerURL from "../utils/validators/isShortenerURL";
import TLDFilter from "../utils/validators/TLDFilter";
import hasSuspiciousIPLikePattern from "../utils/validators/URLHasIPAddress";
import { isMaliciousURL } from "../utils/validators/safeBrowsing";
import sanitizeURL from "../utils/validators/checkSafeURL";
import SERVER from "../utils/messages/serverMessages";
import hasDangerouChars from "../utils/validators/URLHasDangerousChars";


export default class QRCodeGenMiddleware {
    async authenticate(req: Request, res: Response, next: NextFunction) {
        const { url } = req.body;
        try {
            if (!url) {
                return res.status(400).json({
                    message: QRCODEMSG.ERR.MISSING_URL
                });
            };

            const sanitized = sanitizeURL(url);

            const wasSanitized = sanitized !== url;
            const hasDangerChars = hasDangerouChars(url);

            if (wasSanitized && hasDangerChars) {
                return res.status(400).json({
                    message: QRCODEMSG.ERR.UNSAFE_URL_DETECTED
                });
            }

            const isValidURL = validateURL(url);
            if (!isValidURL) {
                return res.status(401).json({
                    message: QRCODEMSG.ERR.NOT_VALID_URL
                });
            };

            const hasIPAddress = hasSuspiciousIPLikePattern(url);
            if (hasIPAddress) {
                return res.status(401).json({
                    message: QRCODEMSG.ERR.URL_IS_IP
                });
            }

            const isShortURL = isShortenerURL(url);
            if (isShortURL) {
                return res.status(403).json({
                    message: QRCODEMSG.ERR.BLACKLISTED_URL
                });
            };

            const suspectURL = TLDFilter(url);
            if (suspectURL) {
                return res.status(401).json({
                    message: QRCODEMSG.ERR.SUSPICIOUS_TLD
                });
            };

            const isNotSafeBrowsing = await isMaliciousURL(url);
            if (isNotSafeBrowsing) {
                return res.status(403).json({
                    message: QRCODEMSG.ERR.MALICIOUS_BY_SAFE_BROWSING
                });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_SERVER_ERROR(error)
            });
        }
    }
}