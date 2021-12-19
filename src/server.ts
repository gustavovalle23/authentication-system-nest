import { app } from "./app";
import dotenv from 'dotenv';

dotenv.config();

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`> [server] Server is running at http://localhost:${PORT}`)
})