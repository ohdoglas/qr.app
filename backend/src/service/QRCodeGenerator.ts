import QRCode  from "qrcode";
import QRCodeC, { } from "../models/QRCode"
import { imgUp } from "../utils/imgUpload";
import supabase from "../config/supabase";

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
            const base64Data = QRResponse.replace(/^data:image\/png;base64,/, "");
            const buffer = Buffer.from(base64Data, "base64");

            const fileName = `QRCode_${Date.now()}.png`;
            const uploadPath = `QRCodeImage/${fileName}`;

            const uploadedImg = await imgUp(uploadPath, buffer, "image/png");

            if (!uploadedImg) {
                throw new Error("Error while updating image on supabase bucket.");
            };

            const { data } = supabase.storage.from("qrappqrcodes").getPublicUrl(uploadedImg.fullPath);

            const qrCodeData = {
                url,
                base64: QRResponse,
                imageUrl: data.publicUrl
            };

            const  savedQrCode = await QRCodeC.create(qrCodeData);

            const qrCodeImg = {
                imageUrl: savedQrCode.imageUrl as string
            }

            await QRCodeC.updateFields(savedQrCode.id, qrCodeImg)

            return savedQrCode;
        } catch (error) {
            console.error(`Error generating QRCode: ${error}`);
            throw error;
        }
    }
}