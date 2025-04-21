import React from "react";
import { Link } from "react-router-dom";
import "../../css/components/header.css"

const Header: React.FC = () => {
    return (
        <header className="header">
            <nav className="header_nav">
                <div className="header_nav_logo">
                <Link to={"/"}><div className="header_nav_logo_img"></div></Link>
                {/* <Link to={"/"}> <h2 className="header_nav_logo_name">QR.App</h2> </Link> */}
                </div>
            </nav>
            <div className="header_nav_buttons">
                <Link to={"/generator"}> <button className="header_nav_gen_button">
                    GENERATE QRCode</button> </Link>
                    <Link to={"/about"}> <button className="header_nav_about_button">
                    ABOUT QRApp</button> </Link>
            </div>
        </header>
    )
}

export default Header;