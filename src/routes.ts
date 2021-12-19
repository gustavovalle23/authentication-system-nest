import jwt from 'jsonwebtoken';
import { orders } from './data/fake';
import { Router } from "express";
import { authenticateToken } from "./security/authentication";



const router = Router();

router.post('/users', (request, response) => {
    return response.status(201).send();
})


router.get('/', authenticateToken, async (req, res) => {
    const ordersFiltered = orders.filter(order => order.username === req.body.name);
    res.send(ordersFiltered);
})

router.post('/login', (req, res) => {
    const username = req.body.username;
    const user = { name: username };
    const secretKey = process.env.ACCESS_TOKEN_SECRET || 'default-token';
    const accessToken = jwt.sign(user, secretKey);
    res.json({ accessToken: accessToken });
})

router.post('/register', (req, res) => {

})

export { router }