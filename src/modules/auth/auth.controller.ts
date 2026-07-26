import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import { AuthRequest } from '../../middlewares/auth';

export const AuthController = {
    register: catchAsync(async (req: Request, res: Response) => {
        const result = await AuthService.register(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'User registered successfully',
            data: result,
        });
    }),

    login: catchAsync(async (req: Request, res: Response) => {
        const result = await AuthService.login(req.body);
        res.cookie('accessToken', result.accessToken, { httpOnly: true, secure: false });
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Logged in successfully',
            data: result,
        });
    }),

    getMe: catchAsync(async (req: AuthRequest, res: Response) => {
        const result = await AuthService.getMe(req.user!.id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'User profile retrieved',
            data: result,
        });
    }),
};