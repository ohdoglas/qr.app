import { v4 as uuidv4 } from "uuid";

type TQRCode = {
    id: string;
    url: string;
    imageUrl?: string
    base64: string;
    createdAt: Date;
    private: boolean;
    scanCount: number;
}

export default TQRCode;