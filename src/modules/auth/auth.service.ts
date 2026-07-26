import bcrypt from 'bcrypt';
import config from '../../config';
import { prisma } from '../../lib/prisma';
import { createToken } from '../../utils/jwt';
import { TLoginUser, TRegisterUser } from './auth.interface';

export const AuthService = {
    async register(payload: TRegisterUser) {
        const existingUser = await prisma.user.findUnique({ where: { email: payload.email } });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(payload.password, config.bcrypt_salt_rounds);

        const user = await prisma.user.create({
            data: {
                ...payload,
                password: hashedPassword,
            },
            select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
        });

        return user;
    },

    async login(payload: TLoginUser) {
        const user = await prisma.user.findUnique({ where: { email: payload.email } });
        if (!user || user.status === 'BLOCKED') {
            throw new Error('Invalid credentials or account suspended');
        }

        const isPasswordValid = await bcrypt.compare(payload.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const accessToken = createToken(
            { id: user.id, role: user.role, email: user.email },
            config.jwt.secret,
            config.jwt.expires_in
        );

        return {
            accessToken,
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        };
    },

    async getMe(userId: string) {
        return await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, role: true, phoneNumber: true, status: true },
        });
    },
};