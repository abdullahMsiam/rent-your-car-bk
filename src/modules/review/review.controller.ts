import { Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { ReviewService } from './review.service';
import { AuthRequest } from '../../middlewares/auth';

export const ReviewController = {
    create: catchAsync(async (req: AuthRequest, res: Response) => {
        const result = await ReviewService.createReview(req.user!.id, req.body);
        sendResponse(res, { statusCode: 201, success: true, message: 'Review posted', data: result });
    }),
};