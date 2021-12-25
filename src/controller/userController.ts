import { Router } from "express";
import prisma from "../data/prisma";
import { authenticateToken, generateAccessToken } from '../security/authentication';


const router = Router();

router.get('/user/:userId', async (request, response) => {
    console.log('Request to "/user"')

    const userId = +request.params.userId;
    if (isNaN(userId)) {
        return response.status(400).send({ message: 'Id must be a integer!' })
    }

    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!user) {
        return response.status(400).send({ message: 'User not found!' })
    }


    return response.status(200).send(user);
})

router.get('/user/all', authenticateToken, async (request, response) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            password: false
        },
        where: {
            role: "USER"
        }
    })

    return response.json(users).status(200).send();
})


router.post('/user/register', async (request, response) => {
    const email = request.body.email;
    const name = request.body.name;
    const password = request.body.password;

    const user = await prisma.user.findFirst({
        where: { email: email }
    });

    if (user) {
        return response.status(400).json({ message: 'User already registered!' });
    }

    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password,
            role: "USER"
        }
    })
    return response.status(201).send();
})


router.post('/user/authenticate', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user || !user.password === password) {
        return res.status(401).send({ message: 'email or password incorret(s)' })
    }

    const accessToken = generateAccessToken(user);
    res.json({ accessToken: accessToken });
})

export { router }
