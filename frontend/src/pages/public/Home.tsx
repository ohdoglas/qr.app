import React from "react";
import Header from "../components/header";
import "../../css/styles/public/Home.css";
// import { useNavigate } from "react-router-dom";


const Home: React.FC = () => {
    // const navigate = useNavigate();
    return (
        <body className="page-one">
            <Header />
            <main className="main_content">
                <div className="test">
                    <h1>QRAPP API - W.I.P</h1>
                </div>
            </main>
        </body>
    )
}

export default Home;