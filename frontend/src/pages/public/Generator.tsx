import React, { useState } from "react";
import Header from "../components/header";
import "../../css/styles/public/Generator.css";
import { generateQRCode } from "../../services/qrcode";
import { AxiosError } from "axios";

const Generator: React.FC = () => {
    const [privacy, setPrivacy] = useState<number>(0);
    const [url, setUrl] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    // const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleGenerate = async () => {
        try {
            setMessage("Generating QRCode...");
            const isPrivate = privacy === -1 ? true : false;

            const response = await generateQRCode(url, isPrivate);

            if (response.imageLink) {
                setImageUrl(response.imageLink);
                setMessage("QRCode generated successfully!");
            } else {
                setMessage("Failed to generate QRCode.");
            }
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            if (axiosError.response && axiosError.response.data) {
                setMessage(axiosError.response.data.message);
            } else {
                setMessage("Erro ao gerar QR Code.");
            }
            setImageUrl(null);
        }
    };

    return (
        <div className="page-one">
            <Header />
            <main className="main_content">
                <div className="main_content_img"></div>
                <div className="main_content_title_div">
                    <h1 className="main_content_title">Generate your QR Code</h1>
                    <h3 className="main_content_subtitle">
                        Enter a URL, choose visibility, and create your custom QR code instantly.
                    </h3>

                    <div className="main_content_section">
                    <section className="generated_qrcode">
                        {message && <p>{message}</p>}
                        {imageUrl && (
                            <img src={imageUrl} alt="Generated QR Code" className="qrcode-image" />
                        )}
                    </section>

                        <input
                            type="text"
                            name="url_link"
                            id="url"
                            className="main_content_url_input"
                            placeholder="Enter URL here..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />

                        <section className="main_content_form">
                            <p>QR Code Visibility:</p>

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

                        <button className="main_content_button" onClick={handleGenerate}>
                            GENERATE QRCODE
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Generator;
