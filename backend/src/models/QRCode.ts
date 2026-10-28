import prisma from "../config/prisma";
import TQRCode from "../types/TQRCode";
import { v4 as uuidv4 } from "uuid";
import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";

type LocalQRCodeRecord = {
    id: string;
    url: string;
    imageUrl?: string;
    base64: string;
    createdAt: string;
    private: boolean;
    scanCount: number;
};

const localQRCodeDataPath = path.resolve(__dirname, "../../data/local-qrcodes.json");
let localWriteQueue: Promise<void> = Promise.resolve();

function isLocalDataStore(): boolean {
    return (process.env.QR_STORAGE_PROVIDER || "supabase").toLowerCase() === "local";
}

async function readLocalQRCodeRecords(): Promise<LocalQRCodeRecord[]> {
    try {
        const contents = await readFile(localQRCodeDataPath, "utf8");
        return JSON.parse(contents) as LocalQRCodeRecord[];
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") {
            return [];
        }
        throw error;
    }
}

async function updateLocalQRCodeRecords<T>(
    update: (records: LocalQRCodeRecord[]) => T | Promise<T>
): Promise<T> {
    let release!: () => void;
    const previousWrite = localWriteQueue;
    localWriteQueue = new Promise<void>((resolve) => { release = resolve; });
    await previousWrite;

    try {
        const records = await readLocalQRCodeRecords();
        const result = await update(records);
        await mkdir(path.dirname(localQRCodeDataPath), { recursive: true });
        const temporaryPath = `${localQRCodeDataPath}.${process.pid}.tmp`;
        await writeFile(temporaryPath, JSON.stringify(records, null, 2), "utf8");
        await rename(temporaryPath, localQRCodeDataPath);
        return result;
    } finally {
        release();
    }
}


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

            if (isLocalDataStore()) {
                const record: LocalQRCodeRecord = {
                    ...qrCode.toJSON(),
                    createdAt: qrCode.createdAt.toISOString()
                };
                await updateLocalQRCodeRecords((records) => { records.push(record); });
                return { ...record, createdAt: new Date(record.createdAt) };
            }

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
            if (isLocalDataStore()) {
                const records = await readLocalQRCodeRecords();
                const found = records.find((record) => record.url === url);
                return found ? { ...found, createdAt: new Date(found.createdAt) } : false;
            }

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
            if (isLocalDataStore()) {
                const records = await readLocalQRCodeRecords();
                return records.find((record) => record.id === id)?.private;
            }

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
            if (isLocalDataStore()) {
                return updateLocalQRCodeRecords((records) => {
                    const record = records.find((entry) => entry.id === id);
                    if (!record) return false;
                    record.scanCount += 1;
                    return { ...record, createdAt: new Date(record.createdAt) };
                });
            }

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
            if (isLocalDataStore()) {
                return updateLocalQRCodeRecords((records) => {
                    const record = records.find((entry) => entry.id === id);
                    if (!record) throw new Error(`QR Code ${id} was not found.`);
                    Object.assign(record, data, data.createdAt ? { createdAt: data.createdAt.toISOString() } : {});
                    return { ...record, createdAt: new Date(record.createdAt) };
                });
            }

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

    static async showQRCodeHistory() {
        if (isLocalDataStore()) {
            const records = await readLocalQRCodeRecords();
            return records
                .filter((record) => !record.private)
                .map(({ url, imageUrl, createdAt, scanCount }) => ({
                    url,
                    imageUrl,
                    createdAt: new Date(createdAt),
                    scanCount
                }));
        }

        const history = await prisma.qRCode.findMany({
            where: {
                private: false
            },
            select: {
                url: true,
                imageUrl: true,
                createdAt: true,
                scanCount: true
            }
        });
        return history;
    }
}
