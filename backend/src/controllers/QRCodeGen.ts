import { Request, Response } from "express";
import QRCodeService from "../service/QRCodeGenerator";
import SERVER from "../utils/messages/serverMessages";
import QRCodeC from "../models/QRCode";
import QRCODEMSG from "../utils/messages/qrCodeMessages";

export default class QRCodeGen {
    async controller(req: Request, res: Response) {
        const { url } = req.body;
        const isPrivate = req.body.isPrivate !== false;
        try {

            const existing = await QRCodeC.findByUrl(url);
            if (!existing || isPrivate || existing.private || !existing.imageUrl) {
                const QRCodeGenerator = new QRCodeService()
                const response = await QRCodeGenerator.generateQRCode(url, isPrivate);
                const imageLink = await QRCodeC.getImageUrl(response.imageUrl as string);

                return res.status(200).json({
                    imageLink
                });
            }

            const existingQrCode = await QRCodeC.getImageUrl(existing.imageUrl as string);
            return res.status(200).json({
                imageLink: existingQrCode
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_SERVER_ERROR(error)
            });
        }
    }
}
