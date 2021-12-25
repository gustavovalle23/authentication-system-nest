import { Router } from "express";
import { PrismaClient } from '@prisma/client';
import { authenticateToken, generateAccessToken } from '../security/authentication';


const router = Router();

router.get('/users', authenticateToken, async (request, response) => {
    const prisma = new PrismaClient();
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


router.post('/register', async (request, response) => {
    const email = request.body.email;
    const name = request.body.name;
    const password = request.body.password;

    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
        where: { email: email }
    });

    if (user) {
        return response.status(400).json({'message': 'Usuário já cadastrado!'});
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


router.post('/login', async (req, res) => {
    const prisma = new PrismaClient();

    const email = req.body.email;
    const password = req.body.password;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user || !user.password === password) {
        return res.status(401).send('email or password incorret(s)')
    }

    const accessToken = generateAccessToken(user);
    res.json({ accessToken: accessToken });
})

export { router }
