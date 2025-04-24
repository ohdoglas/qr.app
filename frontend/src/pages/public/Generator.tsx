import React, { useState } from "react";
import Header from "../components/header";
import "../../css/styles/public/Generator.css";
import { generateQRCode } from "../../services/qrcode";
import { AxiosError } from "axios";
import qrCodeError from "../../assets/qrcode-error.png";

const Generator: React.FC = () => {
    const [privacy, setPrivacy] = useState<number>(0);
    const [url, setUrl] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isQRCodeValid, setIsQRCodeValid] = useState<boolean>(false);
    const [hasTriedToGenerate, setHasTriedToGenerate] = useState<boolean>(false);


    const handleGenerate = async () => {
        setHasTriedToGenerate(true);
        try {
            setMessage("Generating QRCode...");
            setImageUrl(null);
            setIsQRCodeValid(false);

            const isPrivate = privacy === -1 ? true : false;

            const response = await generateQRCode(url, isPrivate);

            if (response.imageLink) {
                setImageUrl(response.imageLink);
                setIsQRCodeValid(true);
                setMessage("QRCode generated successfully!");
            } else if (response.message) {
                setMessage(response.message);
                setImageUrl(qrCodeError);
                setIsQRCodeValid(false);
            } else {
                setMessage("Failed to generate QRCode.");
                setImageUrl(qrCodeError);
                setIsQRCodeValid(false);
            }
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;

            if (axiosError.response && axiosError.response.data) {
                setMessage(axiosError.response.data.message);
            } else {
                setMessage("An unexpected error occurred while trying to generate the QR Code. Please try again later. If the problem persists, please contact support.");
            }

            setImageUrl(qrCodeError);
            setIsQRCodeValid(false);
        }
    };

    return (
        <div className="page-one">
            <Header />
            <main className="main_content">
                <div className="main_content_img"></div>
                    <div className="main_content_section">
                <div className="main_content_title_div">
                    <h1 className="main_content_title">Generate your QR Code</h1>
                    <h3 className="main_content_subtitle">
                        Enter a URL, choose visibility, and create your QR code instantly.
                    </h3>
                    <section className="generated_qrcode">
                        {message && <p>{message}</p>}
                        {imageUrl && isQRCodeValid ? (
                            <img
                                src={imageUrl}
                                alt="Generated QR Code"
                                className="qrcode-image"
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                onClick={(_e) => {
                                    const newTab = window.open(imageUrl, "_blank");
                                    if (!newTab) {
                                        const link = document.createElement('a');
                                        link.href = imageUrl;
                                        link.setAttribute("download", "qrcode.png");
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }
                                }}
                                style={{ cursor: 'pointer' }}
                            />
                        ) : hasTriedToGenerate && (
                            <img
                                src={qrCodeError}
                                alt="QR Code not Generated"
                                className="qrcode-image"
                                style={{ cursor: 'default' }}
                            />
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

                        <button className="generator_button" onClick={handleGenerate}>
                            GENERATE QRCODE
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Generator;
