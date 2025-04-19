import QRCode  from "qrcode";
import fs from "fs";
import path from "path";

const options: QRCode.QRCodeToDataURLOptionsOther = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    margin: 1,
    color: {
        dark:"#000000",
        light: "#FFFFFF"
    }
};

export default class QRCodeService {
    async generateQRCode(url: string) {
        try {
            console.log("Generating QR code for URL (service): ", url);

            const QRResponse = await QRCode.toDataURL(url, options);

            const filePath = path.join(__dirname, "../public/generatedQRCode/QRCode.png");

            const base64Data = QRResponse.replace(/^data:image\/png;base64,/, "");

            fs.writeFileSync(filePath, base64Data, 'base64');

            return QRResponse;
        } catch (error) {
            console.error(`Error generating QRCode: ${error}`);
            throw error;
        }
    }
}