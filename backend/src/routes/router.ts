import { Router } from "express";
import QRCodeGenMiddleware from "../middlewares/authenticateURL";
import QRCodeGen from "../controllers/QRCodeGen";

const QRCodeServiceGenerator = {
    middleware: new QRCodeGenMiddleware().authenticate,
    controller: new QRCodeGen().controller
};

const routes = Router();

routes.post('/qrcode-generator', QRCodeServiceGenerator.middleware, QRCodeServiceGenerator.controller);

export default routes;