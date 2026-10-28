import React, { useEffect } from "react";
import Header from "../components/header";
import "../../css/styles/public/NotFound.css"
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";

const NotFound: React.FC = () => {
    const { t } = useLanguage();
    useEffect(() => {
        document.body.classList.add("no-scroll");

        return () => {
            document.body.classList.remove("no-scroll");
        };

    }, []);

    return (
        <div className="page-three">
            <Header />
            <div className="main_content">
                    <h1 className="main_content_title">
                    {t("notFound.title")}
                    </h1>
                    <h1 className="main_content_subtitle">
                    {t("notFound.message")}
                    </h1>
                <Link to="/" className="not_found_button">{t("notFound.back")}</Link>
                <div className="main_content_404_img">
                </div>
            </div>
        </div>
    )
}

export default NotFound;
