import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import "../../css/styles/public/About.css"


const About: React.FC = () => {
    return (
        <main className="about_main">
            <Header />
            <div className="about_main_content">
            <section className="about_main_section">
                <article>
                    <div className="about_text">
                        <h1>
                        About QRApp
                        </h1>
                        <p>
                        QRApp is a lightweight, open-source tool that allows anyone to generate QR Codes in a matter of seconds — without registration, without tracking, and without ads.
                        Whether you're a developer, a small business owner, or just someone who wants to quickly share a link, QRApp was built to offer speed, simplicity, and privacy.
                        </p>
                    </div>
                    <div className="about_qr_app_img"></div>
                </article>

                <article>
                    <div className="what_qrcodes">
                    <h1>
                        What are QR Codes?
                    </h1>
                    <p>
                        QR (Quick Response) Codes are two-dimensional barcodes that can store URLs, contact information, Wi-Fi credentials, and more. They’re widely used for sharing content easily via smartphone cameras — no typing needed.
                        QRApp helps you create high-quality QR codes instantly for any valid URL.
                    </p>
                    </div>
                    <div className="what_qrcodes_img"></div>
                </article>

                <article>
                    <div className="how_it_works">
                    <h1>
                        How does QRApp work?
                    </h1>
                    <p>
                        You just enter a link, choose if your QR Code should be public or private, and click generate. That’s it.

                        Public codes are shown in the public history page and can be discovered by anyone.

                        Private codes are hidden from public view and only accessible by their direct link.

                        After generation, you’ll get a preview of your QR Code and options to download or share it.
                    </p>
                    </div>
                    <div className="how_it_works_img"></div>

                </article>
                    <div className="tech_stack">
                    <h1>
                        Tech Stack
                    </h1>
                    <p>
                        QRApp is made for developers, by developers – and here's what’s under the hood: <br />

                    </p>
                    <p>
                    Backend: <br />
                        - Express <br />

                        - TypeScript <br />

                        - Prisma ORM <br />

                        - Supabase Storage <br />

                        - PostgreSQL <br />

                        - QRCode.js <br />
                    </p>
                    <p>
                        Frontend: <br />
                        - React <br />

                        - Vite <br />

                        - React Router <br />

                        - TypeScript <br />
                    </p>
                    </div>

                <article>
                    <div className="built_speed">
                    <h1>
                        Built for transparency and speed
                    </h1>
                    <p>
                    We believe that tools should serve users, not harvest their data. QRApp is fully open source, and all the code is available on GitHub.

                    Whether you want to use it, fork it, or contribute, you’re welcome!
                    </p>
                    </div>
                    <div className="built_speed_img"></div>
                </article>
            </section>

            <div className="about_img"></div>
            </div>
            <Footer />
        </main>
    )
}

export default About;