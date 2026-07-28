import { Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { RentalService } from './rental.service.js';
import { AuthRequest } from '../../middlewares/auth.js';

export const RentalController = {
    submitRequest: catchAsync(async (req: AuthRequest, res: Response) => {
        const result = await RentalService.submitRequest(req.user!.id, req.body);
        sendResponse(res, { statusCode: 201, success: true, message: 'Rental request submitted', data: result });
    }),

    getUserRequests: catchAsync(async (req: AuthRequest, res: Response) => {
        const result = await RentalService.getUserRequests(req.user!.id, req.user!.role);
        sendResponse(res, { statusCode: 200, success: true, message: 'Rental requests retrieved', data: result });
    }),

    updateStatus: catchAsync(async (req: AuthRequest, res: Response) => {
        const result = await RentalService.updateRequestStatus(req.params.id as string, req.user!.id, req.body.status);
        sendResponse(res, { statusCode: 200, success: true, message: `Rental request ${req.body.status}`, data: result });
    }),
};