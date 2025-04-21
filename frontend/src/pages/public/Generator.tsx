import React, { useState } from "react";
import Header from "../components/header";
import "../../css/styles/public/Generator.css";


const Generator: React.FC = () => {
    const [privacy, setPrivacy] = useState<number | null>(null);
    return (
        <div className="page-one">
            <Header />
                <main className="main_content">
                    <div className="main_content_img"></div>
                    <div className="main_content_title_div">
                        <h1 className="main_content_title">Generate your QR Code</h1>
                        <h3 className="main_content_subtitle">Enter a URL, choose visibility, and create your custom QR code instantly.</h3>
                        <div className="main_content_section">
                        <section className="generated_qrcode">

                        </section>
                            <input type="text" name="url_link" id="url" className="main_content_url_input" />
                            <section className="main_content_form">
                                <p>QRCODE Visibility:</p>

                                <label htmlFor="public" className="radio-label">
                                    <input
                                    type="radio"
                                    name="privacy"
                                    id="public"
                                    value={0}
                                    checked={privacy === 0}
                                    onChange={(e) => setPrivacy(Number(e.target.value))}
                                    required
                                    />
                                    <span>Public</span>
                                </label>

                                <label htmlFor="private" className="radio-label">
                                    <input
                                    type="radio"
                                    name="privacy"
                                    id="private"
                                    value={-1}
                                    checked={privacy === -1}
                                    onChange={(e) => setPrivacy(Number(e.target.value))}
                                    required
                                    />
                                    <span>Private</span>
                                </label>
                                </section>

                        <button className="main_content_button">GENERATE QRCODE</button>
                    </div>
                </div>
                </main>
        </div>
    )
}

export default Generator;