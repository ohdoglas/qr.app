import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import type { TranslationKey } from "../../i18n/translations";
import BrandLogo from "./BrandLogo";
import "../../css/components/header.css";

const navigationItems: Array<{ to: string; label: TranslationKey; end: boolean }> = [
    { to: "/", label: "header.home", end: true },
    { to: "/generator", label: "header.generator", end: false },
    { to: "/templates", label: "header.templates", end: false },
    { to: "/about", label: "header.about", end: false },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <Link className="site-brand" to="/" aria-label={t("header.brandHome")}>
                    <BrandLogo />
                </Link>

                <div className="site-header-actions">
                    <nav
                        className={`site-navigation${isMenuOpen ? " is-open" : ""}`}
                        id="site-navigation"
                        aria-label={t("header.mainNavigation")}
                    >
                        {navigationItems.map(({ to, label, end }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={end}
                                className={({ isActive }) => `site-navigation-link${isActive ? " is-active" : ""}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t(label)}
                            </NavLink>
                        ))}
                    </nav>
                    <label className="site-language-control">
                        <span className="visually-hidden">{t("header.language")}</span>
                        <select
                            aria-label={t("header.language")}
                            value={language}
                            onChange={(event) => setLanguage(event.target.value as "en" | "pt")}
                        >
                            <option value="pt">Português</option>
                            <option value="en">English</option>
                        </select>
                    </label>
                    <button
                        className="site-menu-toggle"
                        type="button"
                        aria-expanded={isMenuOpen}
                        aria-controls="site-navigation"
                        onClick={() => setIsMenuOpen((open) => !open)}
                    >
                        <span className="site-menu-icon" aria-hidden="true" />
                        <span className="site-menu-label">{isMenuOpen ? t("header.closeMenu") : t("header.menu")}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
