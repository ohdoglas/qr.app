import { Request, Response } from "express";
import SERVER from "../utils/messages/serverMessages";
import QRCodeC from "../models/QRCode";


export default class QRCodeHistory {
    async controller(req: Request, res: Response) {
        try {
            const history = await QRCodeC.showQRCodeHistory();

            return res.status(200).json({
                history
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: SERVER.ERR.INTERNAL_SERVER_ERROR(error)
            });
        }
    }
}