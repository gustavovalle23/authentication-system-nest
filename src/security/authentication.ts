import { Response, Request, NextFunction } from 'express-serve-static-core';
import jwt, { TokenExpiredError } from 'jsonwebtoken';


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    const secretKey = process.env.ACCESS_TOKEN_SECRET || 'default-token';
    jwt.verify(token, secretKey, (err: TokenExpiredError, user: any) => {
        if (err) {
            return res.json({ message: err.message }).sendStatus(403);
        }
        req.body = user;
        next();
    })
}


export const generateAccessToken = (user: Object) => {
    const secretKey = process.env.ACCESS_TOKEN_SECRET || 'default-token';
    return jwt.sign(user, secretKey, { expiresIn: '86400s' });
}
