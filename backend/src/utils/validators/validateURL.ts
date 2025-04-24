import validator from "validator";

export default function validateURL(url: string) {
    try {
        const isValidURL = validator.isURL(url, {
            require_protocol: true,
            protocols: ["http", "https"],
            allow_underscores: false,
            allow_trailing_dot: false,
            allow_protocol_relative_urls: false,
        });

        return isValidURL;
    } catch (error) {
        console.error(error);
        throw new Error(`Error while URL validation: ${error}`);
    }
}