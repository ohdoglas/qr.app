import React from "react";
import Header from "../components/header";
import "../../css/styles/public/NotFound.css"
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
    return (
        <div className="page-three">
            <Header />
            <div className="main_content">
                <div className="main_content_title">
                    <h1 className="main_content_title_h1">
                    404 - Page Not Found
                    </h1>
                </div>
                <div className="main_content_subtitle">
                    <h1 className="main_content_subtitle_h3">
                    Oops! The page you’re looking for doesn’t exist.
                    It might have been moved, deleted, or never existed.
                    </h1>
                </div>
                <Link to={"/"}>  <button className="not_found_button">Back to QR.App</button></Link>
                <div className="main_content_404_img">
                </div>
            </div>
        </div>
    )
}

export default NotFound;