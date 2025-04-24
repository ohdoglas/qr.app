import { Request, Response } from "express";
import QRCodeService from "../service/QRCodeGenerator";
import SERVER from "../utils/messages/serverMessages";
import QRCodeC from "../models/QRCode";
import QRCODEMSG from "../utils/messages/qrCodeMessages";

export default class QRCodeGen {
    async controller(req: Request, res: Response) {
        const { url, isPrivate } = req.body;
        try {

            const existing = await QRCodeC.findByUrl(url);
            if (!existing || isPrivate) {
                const QRCodeGenerator = new QRCodeService()
                const response = await QRCodeGenerator.generateQRCode(url);

                if (isPrivate) {
                    const data = {
                        private: isPrivate
                    }

                    await QRCodeC.updateFields(response.id, data);
                }
                const imageLink = response.imageUrl

                return res.status(200).json({
                    imageLink
                });
            }

            const existingQrCode = existing.imageUrl;
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