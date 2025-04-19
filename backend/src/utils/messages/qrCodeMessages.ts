const QRCODEMSG = {
    ERR: {
        MISSING_QRCODE_IMG_FILE: "Please, insert an image for upload.",
        MISSING_QRCODE_ID: "ID is missing. Please provide an ID to complete the request.",
        WRONG_UUID_FORMAT: "Invalid ID. The provided ID is not a valid uuid.",

        MISSING_URL: "URL is missing. Please enter a URL. A valid URL is required for the QRCode to be generated successfully.",
        NOT_VALID_URL: "Invalid URL. Please, the URL format you entered is not a valid accepted format.",
        BLACKLISTED_URL: "Blocked URL. The provided link uses a known URL shortener or is blacklisted due to masking risks. Please provide the original URL.",
        SUSPICIOUS_TLD: "Suspicious domain extension. The domain's top-level extension (TLD) is commonly associated with malicious or spammy sites. Please double-check the URL.",
        URL_IS_IP: "IP address detected. URLs using raw IP addresses are not allowed due to security risks. Please provide a proper domain name.",
        DANGEROUS_KEYWORDS: "Potentially harmful content. The URL contains keywords commonly used in phishing or malicious schemes. Please verify and modify the link.",
        MALICIOUS_BY_SAFE_BROWSING: "Unsafe URL detected. This link has been flagged as malicious by Google Safe Browsing. Please use a trusted and verified URL.",
        UNSAFE_URL_DETECTED: "This URL looks unsafe and may contain malicious content. Please use a clean and secure link.",



    },
    SUCCESS: {

    }
}

export default QRCODEMSG;