import { useEffect, useMemo, useState, type ReactNode } from "react";
import { LanguageContext } from "./LanguageContext";
import { translate, type Language } from "./translations";

function getInitialLanguage(): Language {
    try {
        const saved = window.localStorage.getItem("qrapp-language");
        if (saved === "en" || saved === "pt") return saved;
    } catch {
        // Continue with the Portuguese default when browser storage is unavailable.
    }
    return "pt";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>(getInitialLanguage);

    useEffect(() => {
        const locale = language === "pt" ? "pt-BR" : "en";
        const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        const openGraphTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
        const openGraphDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');

        document.documentElement.lang = locale;
        document.title = translate(language, "meta.title");
        if (description) description.content = translate(language, "meta.description");
        if (openGraphTitle) openGraphTitle.content = translate(language, "meta.title");
        if (openGraphDescription) openGraphDescription.content = translate(language, "meta.ogDescription");

        try {
            window.localStorage.setItem("qrapp-language", language);
        } catch {
            // Language selection remains active for this session if storage is unavailable.
        }
    }, [language]);

    const value = useMemo(() => ({
        language,
        setLanguage,
        t: (key: Parameters<typeof translate>[1], values?: Record<string, string | number>) => translate(language, key, values),
    }), [language]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
