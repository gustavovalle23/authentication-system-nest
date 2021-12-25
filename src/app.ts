import express from 'express';
import { router as userRoute } from './controller/userController';
import { router as homeRoute } from './controller/homeController';

const app = express();

app.use(express.json());
app.use(homeRoute, userRoute);

export { app }