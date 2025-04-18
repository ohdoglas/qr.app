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
}