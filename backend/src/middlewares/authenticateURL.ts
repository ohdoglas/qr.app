import { NextFunction, Request, Response } from "express";


export default class QRCodeGenMiddleware {
    async authenticate(req: Request, res: Response, next: NextFunction) {
        const { url } = req.body;
        try {
            if (!url) {
                return res.status(400).json({
                    message: "Missing URL"
                });
            }

            if (typeof url !== "string" || !url.startsWith("http")) {
                return res.status(400).json({
                    message: "Invalid URL"
                });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: `Internal Server Error: ${error}`
            });
        }
    }
}