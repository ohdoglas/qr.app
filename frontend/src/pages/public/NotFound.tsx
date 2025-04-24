import React, { useEffect } from "react";
import Header from "../components/header";
import "../../css/styles/public/NotFound.css"
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
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
                    404 - Page Not Found
                    </h1>
                    <h1 className="main_content_subtitle">
                    Oops! The page you’re looking for doesn’t exist.
                    It might have been moved, deleted, or never existed.
                    </h1>
                <Link to={"/"}>  <button className="not_found_button">Back to QR.App</button></Link>
                <div className="main_content_404_img">
                </div>
            </div>
        </div>
    )
}

export default NotFound;