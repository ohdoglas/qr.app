import 'dotenv/config';
import app from './app';

const PORT = Number(process.env.PORT || process.env.SERVER_PORT || 3000);

const onServerStarted = () => {
    console.log(`QR.APP running on PORT: ${PORT}`);
};

if ((process.env.QR_STORAGE_PROVIDER || "supabase").toLowerCase() === "local") {
    app.listen(PORT, "127.0.0.1", onServerStarted);
} else {
    app.listen(PORT, onServerStarted);
}
