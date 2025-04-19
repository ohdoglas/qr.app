import { NextFunction, Request, Response } from "express";
import SERVER from "../utils/messages/serverMessages";
import { validate as isValid } from "uuid";
import QRCODEMSG from "../utils/messages/qrCodeMessages";


export default class QRCodeImageUploadM {
    async authenticate(req: Request, res: Response, next: NextFunction) {
        const image = req.file;
        // const { id } = req.body;
        try {

            // if (!id) {
            //     return res.status(400).json({
            //         message: QRCODE.ERR.MISSING_QRCODE_ID
            //     });
            // }

            // if (!isValid(id)) {
            //     return res.status(400).json({
            //         message: QRCODE.ERR.WRONG_UUID_FORMAT
            //     });
            // }

            if (!image) {
                return res.status(400).json({
                    message: QRCODEMSG.ERR.MISSING_QRCODE_IMG_FILE
                });
            }

            next();
        } catch (error) {
            console.error(error);
            const err = SERVER.ERR.INTERNAL_SERVER_ERROR(error);
            return res.status(500).json({
                message: err
            });
        }
    }
}