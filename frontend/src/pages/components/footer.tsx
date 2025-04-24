import React from "react";
import "../../css/components/footer.css"


const Footer: React.FC = () => {
    return (
        <footer className="main_footer">
            <div className="footer_icon_left">
                <a href="https://github.com/ohdoglas" target="blank">
                    <div className="footer_icon_left_img"></div>
                    <p className="icon_text">Creator GitHub</p>
                </a>
            </div>
            <div className="footer_center">
                <a href="https://github.com/ohdoglas/qr.app" target="blank">
                    <div className="footer_icon_center_img"></div>
                    <p className="icon_text">Repository</p>
                </a>
            </div>
            <div className="footer_icon_right">
                <a href="https://www.linkedin.com/in/douglasfnmorais/" target="blank">
                    <div className="footer_icon_right_img"></div>
                    <p className="icon_text">Creator Linkedin</p>
                </a>
            </div>
        </footer>
    )
}

export default Footer;