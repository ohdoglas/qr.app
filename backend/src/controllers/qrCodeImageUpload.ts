import { Request, Response } from "express";
import SERVER from "../utils/messages/serverMessages";
import { imgUp } from "../utils/imgUpload";
import SUPAMSG from "../utils/messages/supaMessages";
import supabase from "../config/supabase";


export default class QRCodeImageUploadC {
    async controller(req: Request, res: Response) {
        // const { id } = req.body;
        const image = req.file;

        try {
            const uploadedImg = await imgUp(`QRCodeImage/${image!.originalname}`,
                image!.buffer,
                image!.mimetype
            );

            if (!uploadedImg) {
                return res.status(500).json({
                    message: SUPAMSG.ERR.IMG_UPLOAD_FAILED_SERVER
                });
            }

            const { data } = supabase.storage.from("qrappqrcodes").getPublicUrl(uploadedImg.fullPath);

            return res.status(201).json({
                message: SUPAMSG.SUCCESS.IMG_UPLOADED_SUCCESSFULLY,
                upload: data.publicUrl,
            });
        } catch (error) {
            console.error(error);
            const err = SERVER.ERR.INTERNAL_SERVER_ERROR(error);
            return res.status(500).json({
                message: err
            });
        }
    }
}