import { Router } from "express";
import { deleteUserById, findUserByEmail, findUserById, findUsersAll, saveUser } from "../repository/userRepository";
import { authenticateToken, generateAccessToken } from '../security/authentication';


const router = Router({});


router.get('/user/all', authenticateToken, async (req, res) => {
    const users = await findUsersAll();

    return res.json(users).status(200).send();
});


router.delete('/user/:userId', authenticateToken, async (req, res) => {
    await deleteUserById(+req.params.userId);
})


router.get('/user/:userId', authenticateToken, async (req, res) => {
    console.log(`request to "/user" ${req.params.userId}`);

    const userId = +req.params.userId;
    if (isNaN(userId)) {
        return res.status(400).send({ message: 'Id must be a integer!' });
    }

    const user = await findUserById(userId);

    if (!user) {
        return res.status(400).send({ message: 'User not found!' });
    }

    return res.status(200).send(user);
})


router.post('/user/register', async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const user = await findUserByEmail(email);

    if (user) {
        return res.status(400).json({ message: 'User already registered!' });
    }

    saveUser(name, email, password);

    return res.status(201).send();
})


router.post('/user/authenticate', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const user = await findUserByEmail(email);

    if (!user || !user.password === password) {
        return res.status(401).send({ message: 'email or password incorret(s)' });
    }

    const accessToken = generateAccessToken(user);
    res.json({ accessToken: accessToken });
})

export { router }
