import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import "../../css/styles/public/About.css";

const About = () => {
    const { t } = useLanguage();

    return (
        <div className="about-page">
            <Header />
            <main className="about-main">
                <section className="about-hero" aria-labelledby="about-title">
                    <p className="about-eyebrow">{t("about.eyebrow")}</p>
                    <h1 id="about-title">{t("about.title")}</h1>
                    <p className="about-lead">{t("about.intro")}</p>
                    <div className="about-hero-actions">
                        <Link className="about-primary-action" to="/generator">{t("about.openGenerator")} <span aria-hidden="true">→</span></Link>
                        <Link className="about-secondary-action" to="/templates">{t("about.browse")}</Link>
                    </div>
                    <ul className="about-facts" aria-label={t("about.characteristics")}>
                        <li><span aria-hidden="true">✓</span> {t("about.runsLocal")}</li>
                        <li><span aria-hidden="true">✓</span> {t("about.noAccount")}</li>
                        <li><span aria-hidden="true">✓</span> {t("about.static")}</li>
                    </ul>
                </section>

                <section className="about-section" aria-labelledby="about-static-title">
                    <div className="about-section-heading">
                        <p className="about-kicker">{t("about.basics")}</p>
                        <h2 id="about-static-title">{t("about.staticTitle")}</h2>
                        <p>{t("about.staticText")}</p>
                    </div>
                    <div className="about-step-grid">
                        <article className="about-step-card">
                            <span className="about-step-number">01</span>
                            <h3>{t("about.chooseFormat")}</h3>
                            <p>{t("about.chooseFormatText")}</p>
                        </article>
                        <article className="about-step-card">
                            <span className="about-step-number">02</span>
                            <h3>{t("about.enterContent")}</h3>
                            <p>{t("about.enterContentText")}</p>
                        </article>
                        <article className="about-step-card">
                            <span className="about-step-number">03</span>
                            <h3>{t("about.previewExport")}</h3>
                            <p>{t("about.previewExportText")}</p>
                        </article>
                    </div>
                </section>

                <section className="about-privacy-section" aria-labelledby="about-privacy-title">
                    <div>
                        <p className="about-kicker">{t("about.privacyEyebrow")}</p>
                        <h2 id="about-privacy-title">{t("about.privacyTitle")}</h2>
                        <p>{t("about.privacyIntro")}</p>
                    </div>
                    <div className="about-privacy-cards">
                        <article>
                            <h3>{t("about.generator")}</h3>
                            <p>{t("about.generatorPrivacy")}</p>
                        </article>
                        <article>
                            <h3>{t("about.localGeneration")}</h3>
                            <p>{t("about.localGenerationPrivacy")}</p>
                        </article>
                        <article>
                            <h3>{t("about.sharedContent")}</h3>
                            <p>{t("about.sharedContentText")}</p>
                        </article>
                    </div>
                </section>

                <section className="about-stack-section" aria-labelledby="about-stack-title">
                    <div>
                        <p className="about-kicker">{t("about.stackEyebrow")}</p>
                        <h2 id="about-stack-title">{t("about.stackTitle")}</h2>
                        <p>{t("about.stackText")}</p>
                    </div>
                    <a className="about-source-link" href="https://github.com/ohdoglas/qr.app" target="_blank" rel="noopener noreferrer">
                        {t("about.source")} <span aria-hidden="true">↗</span>
                    </a>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
