import { Request, Response } from "express";

import QRCodeService from "../service/QRCode";


export default class QRCodeGen {
    async controller(req: Request, res: Response) {
        const { url } = req.body;
        try {
            const QRCodeGenerator = new QRCodeService()
            const response = await QRCodeGenerator.generateQRCode(url);

            return res.status(200).json({
                QRCode: response
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: `Internal Server Error: ${error}`
            });
        }
    }
}