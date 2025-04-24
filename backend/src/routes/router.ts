import { Router } from "express";
import QRCodeGenMiddleware from "../middlewares/authenticateURL";
import QRCodeGen from "../controllers/QRCodeGen";
import QRCodeHistoryMiddleware from "../middlewares/authenticateQRCodeHistory";
import QRCodeHistory from "../controllers/QRCodeHistory";


const QRCodeServiceGenerator = {
    middleware: new QRCodeGenMiddleware().authenticate,
    controller: new QRCodeGen().controller
};

const QRCodeHistoryService = {
    middleware: new QRCodeHistoryMiddleware().authenticate,
    controller: new QRCodeHistory().controller
}

const routes = Router();

routes.post('/qrcode-generator', QRCodeServiceGenerator.middleware, QRCodeServiceGenerator.controller);
routes.get('/history', QRCodeHistoryService.middleware, QRCodeHistoryService.controller);


export default routes;