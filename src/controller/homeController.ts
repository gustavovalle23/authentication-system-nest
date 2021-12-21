import { Router } from "express";
import { authenticateToken } from "../security/authentication";

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
    res.send(200);
})


export { router }