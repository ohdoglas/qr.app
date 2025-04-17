import 'dotenv/config';
import app from './app';

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
    console.log(`QR.APP running on PORT: ${PORT}`)
});