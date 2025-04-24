import { NextFunction, Request, Response } from "express";
import SERVER from "../utils/messages/serverMessages";
import QRCodeC from "../models/QRCode";
import QRCODEMSG from "../utils/messages/qrCodeMessages";



export default class QRCodeHistoryMiddleware {
    async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            const isDbEmpty = await QRCodeC.showQRCodeHistory();

            if (!isDbEmpty) {
                return res.status(400).json({
                    message: QRCODEMSG.ERR.QRCODE_SERVER_HISTORY_EMPTY
                });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_SERVER_ERROR(error)
            });
        }
    }
}