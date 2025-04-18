import prisma from "../config/prisma";
import TQRCode from "../types/TQRCode";
import { v4 as uuidv4 } from "uuid";


export default class QRCode {
    id: string;
    url: string;
    imageUrl?: string;
    base64: string;
    createdAt: Date;
    private: boolean;
    scanCount: number;

    constructor (props: TQRCode) {
        this.id = props.id || uuidv4();
        this.url = props.url || "";
        this.imageUrl = props.imageUrl;
        this.base64 = props.base64 || "";
        this.createdAt = props.createdAt || new Date();
        this.private = props.private ?? false;
        this.scanCount = props.scanCount ?? 0;
    }

    static async isPrivate(id: string) {

        try {
            const state = await prisma.qRCode.findUnique({
                where:{ id: id},
                select: { private: true }
            });

            return state?.private;
        } catch (error) {
            console.error(error);
            throw new Error(`Error checking if data is private: ${error}`, )
        }
    }

    static async incrementScanCount(id: string) {
        try {
            const currentCount = await prisma.qRCode.findUnique({
                where: { id: id},
                select: { scanCount: true }
            });

            if (currentCount === null) {
                return false;
            }

            const newCount = currentCount!.scanCount + 1;

            const updateCount = await prisma.qRCode.update({
                where: { id: id},
                data: { scanCount: newCount }
            });

            return updateCount;
        } catch (error) {
            console.error(error);
            throw new Error(`Error trying to increment Scan Count: ${error}`);
        }
    }

    static async updateField(id: string, data: Partial<TQRCode>) {
        try {
            const updateQRCode = await prisma.qRCode.update({
                where: { id: id },
                data,
            });

            return updateQRCode;
        } catch (error) {
            console.error(error);
            throw new Error(`Error while field update: ${error}`);
        }
    }

}