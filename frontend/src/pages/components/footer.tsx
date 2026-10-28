import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import "../../css/components/footer.css";

const Footer = () => {
    const { t } = useLanguage();

    return <footer className="site-footer">
        <div className="site-footer-inner">
            <div className="site-footer-brand">
                <span className="site-brand-mark" aria-hidden="true">QR</span>
                <span>QR.APP</span>
            </div>
            <p className="site-footer-description">{t("footer.description")}</p>
            <nav className="site-footer-links" aria-label={t("footer.navigation")}>
                <Link to="/about">{t("footer.about")}</Link>
                <a href="https://github.com/ohdoglas/qr.app" target="_blank" rel="noopener noreferrer">{t("footer.source")}</a>
                <a href="https://www.linkedin.com/in/douglasfnmorais/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </nav>
            <small className="site-footer-meta">{t("footer.meta")}</small>
        </div>
    </footer>
};

export default Footer;
