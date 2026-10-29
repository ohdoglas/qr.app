import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";
import BrandLogo from "../components/BrandLogo";
import "../../css/styles/public/Home.css";

const Home = () => {
    const { t } = useLanguage();

    return (
        <div className="home-page">
            <Header />
            <main>
                <section className="home-hero" aria-labelledby="home-title">
                    <div className="home-hero-inner">
                        <div className="home-hero-copy">
                            <BrandLogo className="home-hero-brand" />
                            <p className="home-eyebrow"><span aria-hidden="true" /> {t("home.eyebrow")}</p>
                            <h1 id="home-title">{t("home.titleStart")} <span>{t("home.titleEnd")}</span></h1>
                            <p className="home-intro">{t("home.intro")}</p>
                            <div className="home-actions">
                                <Link className="home-primary-action" to="/generator">
                                    {t("home.create")} <span aria-hidden="true">↗</span>
                                </Link>
                                <a className="home-secondary-action" href="#how-it-works">{t("home.howLink")}</a>
                            </div>
                            <ul className="home-benefits" aria-label={t("home.benefits")}>
                                <li><span aria-hidden="true">✓</span> {t("home.local")}</li>
                                <li><span aria-hidden="true">✓</span> {t("home.export")}</li>
                                <li><span aria-hidden="true">✓</span> {t("home.noSignup")}</li>
                            </ul>
                        </div>

                        <div className="home-visual" aria-label={t("home.decorative")}>
                            <div className="home-visual-glow" aria-hidden="true" />
                            <div className="home-qr-card" aria-hidden="true">
                                <div className="home-qr-art">
                                    <span className="home-qr-finder home-qr-finder-one"><i /></span>
                                    <span className="home-qr-finder home-qr-finder-two"><i /></span>
                                    <span className="home-qr-finder home-qr-finder-three"><i /></span>
                                    <span className="home-qr-pixels home-qr-pixels-a" />
                                    <span className="home-qr-pixels home-qr-pixels-b" />
                                    <span className="home-qr-pixels home-qr-pixels-c" />
                                    <span className="home-qr-pixels home-qr-pixels-d" />
                                </div>
                                <div className="home-qr-caption">
                                    <span className="home-qr-caption-dot" />
                                    <span>{t("home.scanCaption")}</span>
                                </div>
                            </div>
                            <span className="home-visual-note">{t("home.decorativeNote")}</span>
                        </div>
                    </div>
                    <div className="home-hero-bottom" aria-hidden="true">
                        <span>{t("home.heroFootLeft")}</span><span className="home-hero-line" /><span>{t("home.heroFootRight")}</span>
                    </div>
                </section>

                <section className="home-how" id="how-it-works" aria-labelledby="home-how-title">
                    <div className="home-section-heading">
                        <p className="home-section-kicker">{t("home.sectionKicker")}</p>
                        <h2 id="home-how-title">{t("home.stepsTitle")}</h2>
                        <p>{t("home.stepsIntro")}</p>
                    </div>
                    <ol className="home-steps">
                        <li className="home-step-card">
                            <span className="home-step-number">01</span>
                            <span className="home-step-icon" aria-hidden="true">↗</span>
                            <h3>{t("home.step1Title")}</h3>
                            <p>{t("home.step1Text")}</p>
                        </li>
                        <li className="home-step-card">
                            <span className="home-step-number">02</span>
                            <span className="home-step-icon home-step-icon-scan" aria-hidden="true">⌗</span>
                            <h3>{t("home.step2Title")}</h3>
                            <p>{t("home.step2Text")}</p>
                        </li>
                        <li className="home-step-card">
                            <span className="home-step-number">03</span>
                            <span className="home-step-icon home-step-icon-download" aria-hidden="true">↓</span>
                            <h3>{t("home.step3Title")}</h3>
                            <p>{t("home.step3Text")}</p>
                        </li>
                    </ol>
                </section>

                <section className="home-format" aria-labelledby="home-format-title">
                    <div className="home-format-inner">
                        <div>
                            <p className="home-section-kicker">{t("home.formatsKicker")}</p>
                            <h2 id="home-format-title">{t("home.formatsTitle")}</h2>
                            <p>{t("home.formatsText")}</p>
                        </div>
                        <Link className="home-format-link" to="/generator">{t("home.openGenerator")} <span aria-hidden="true">→</span></Link>
                    </div>
                </section>

                <section className="home-privacy" aria-label={t("home.privacyLabel")}>
                    <span className="home-privacy-icon" aria-hidden="true">◎</span>
                    <p><strong>{t("home.privacyStrong")}</strong> {t("home.privacyText")}</p>
                    <Link to="/about">{t("home.learnMore")} <span aria-hidden="true">→</span></Link>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
