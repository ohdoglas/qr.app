import { Router } from "express";
import QRCodeGenMiddleware from "../middlewares/authenticateURL";
import QRCodeGen from "../controllers/QRCodeGen";
import imgUpload from "../config/multer";
import QRCodeImageUploadM from "../middlewares/authorizeQrCodeImageUpload";
import QRCodeImageUploadC from "../controllers/qrCodeImageUpload";

const QRCodeServiceGenerator = {
    middleware: new QRCodeGenMiddleware().authenticate,
    controller: new QRCodeGen().controller
};

const QRCodeImageUpload = {
    middleware: new QRCodeImageUploadM().authenticate,
    controller: new QRCodeImageUploadC().controller
};

const routes = Router();

routes.post('/qrcode-generator', QRCodeServiceGenerator.middleware, QRCodeServiceGenerator.controller);
routes.post('/qrcode-img-upload', imgUpload.single("image"), QRCodeImageUpload.middleware, QRCodeImageUpload.controller);

export default routes;