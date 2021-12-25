import { app } from "./app";
import dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;

app.listen(PORT, () => {
    console.log(`> [server] Server is running at ${HOST}:${PORT}`)
})