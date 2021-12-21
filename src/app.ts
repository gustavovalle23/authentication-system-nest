import express from 'express';
import { homeRoute, userRoute } from './routes';

const app = express();

app.use(express.json());
app.use(homeRoute, userRoute);

export { app }