import React from "react";
import Header from "../components/header";
import "../../css/styles/public/Home.css";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";


const Home: React.FC = () => {
    // const navigate = useNavigate();
    return (
        <div className="page-one">
            <Header />
            <main className="main_content">
                <div className="main_content_img"></div>
                <div className="main_content_title_div">
                    <h1 className="main_content_title">Welconme to QR.App</h1>
                    <h3 className="main_content_subtitle">Turn any link into a QR Code in seconds.</h3>
                    <div className="main_content_section">
                        <Link to={"/generator"}>  <button className="main_content_button">GENERATE QRCODE</button></Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Home;