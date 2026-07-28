import { Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { ReviewService } from './review.service.js';
import { AuthRequest } from '../../middlewares/auth.js';

export const ReviewController = {
    create: catchAsync(async (req: AuthRequest, res: Response) => {
        const result = await ReviewService.createReview(req.user!.id, req.body);
        sendResponse(res, { statusCode: 201, success: true, message: 'Review posted', data: result });
    }),
};