import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config/index.js';
import { verifyToken } from '../utils/jwt.js';
import { prisma } from '../lib/prisma.js';

export interface AuthRequest extends Request {
    user?: JwtPayload & { id: string; role: string };
}

export const auth = (...roles: string[]) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized: Access token is missing',
                    errorDetails: null,
                });
            }

            const decoded = verifyToken(token, config.jwt.secret as string) as JwtPayload & { id: string; role: string };

            const user = await prisma.user.findUnique({ where: { id: decoded.id } });

            if (!user || user.status === 'BLOCKED') {
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: Account suspended or non-existent',
                    errorDetails: null,
                });
            }

            if (roles.length > 0 && !roles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: 'Forbidden: Insufficient permissions',
                    errorDetails: null,
                });
            }

            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired authentication token',
                errorDetails: error,
            });
        }
    };
};