import prisma from "../config/prisma";
import TQRCode from "../types/TQRCode";
import { v4 as uuidv4 } from "uuid";


export default class QRCodeC {
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

    static async create(data: {
        url: string,
        base64: string,
        imageUrl: string
    }) {
        try {
            const qrCode = new QRCodeC({
                id: uuidv4(),
                url: data.url,
                imageUrl:data.imageUrl,
                base64: data.base64,
                createdAt: new Date(),
                private: false,
                scanCount: 0
            });

            const qrCodeData = await prisma.qRCode.create({
                data: qrCode
            });

            return qrCodeData;
        } catch (error) {
            console.error(error);
            throw new Error(`Error while inserting new QRCode data on database: ${error}`);
        }
    }

    static async findByUrl(url: string) {
        try {
            const find = await prisma.qRCode.findFirst({
                where: { url: url }
                }
            );

            if (!find) {
                return false;
            }

            return find;
        } catch (error) {
            console.error(error);
            throw new Error(`Error while finding by url: ${error}`);
        }
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

    static async updateFields(id: string, data: Partial<TQRCode>) {
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

    toJSON() {
        return {
            id: this.id,
            url: this.url,
            imageUrl: this.imageUrl,
            base64: this.base64,
            createdAt: this.createdAt,
            private: this.private,
            scanCount: this.scanCount
        };
    }
}