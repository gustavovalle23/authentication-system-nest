import { Response, Request, NextFunction } from 'express-serve-static-core';

import jwt from 'jsonwebtoken';


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    const secretKey = process.env.ACCESS_TOKEN_SECRET || 'default-token';
    jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.body = user;
        next()
    })
}
