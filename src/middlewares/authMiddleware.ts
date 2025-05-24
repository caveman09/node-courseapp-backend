import { JWT_USER_PASSWORD, JWT_ADMIN_PASSWORD } from "../config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface RequestwithUser extends Request {
    user?: {
        id: string;
        role: 'admin' | 'user';
    };
}

export default function authMiddleware(req: RequestwithUser, res: Response, next: NextFunction) {
    const cookie = req.headers.cookie;
    if (!cookie) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const tokenCookie = cookie.split(';').find(c => c.startsWith('token='));
    if (!tokenCookie) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const token = tokenCookie.split('=')[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    let decoded: any;
    try {
        decoded = jwt.decode(token);
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }

    if (decoded.role === 'admin') {
        try {
            const verified = jwt.verify(token, JWT_ADMIN_PASSWORD);
            if (!verified) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            req.user = { id: decoded.id, role: 'admin' };
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
    }
    else if (decoded.role === 'user') {
        try {
            const verified = jwt.verify(token, JWT_USER_PASSWORD);
            if (!verified) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            req.user = { id: decoded.id, role: 'user' };
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
    }
};
