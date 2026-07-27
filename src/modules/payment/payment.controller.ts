import { Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { PaymentService } from './payment.service';
import { AuthRequest } from '../../middlewares/auth';

export const PaymentController = {
  createPayment: catchAsync(async (req: AuthRequest, res: Response) => {
    const result = await PaymentService.createStripeCheckout(req.body.rentalRequestId, req.user!.id);
    sendResponse(res, { statusCode: 200, success: true, message: 'Checkout URL created', data: result });
  }),

  confirmPayment: catchAsync(async (req: AuthRequest, res: Response) => {
    const result = await PaymentService.confirmStripePayment(req.body.sessionId);
    sendResponse(res, { statusCode: 200, success: true, message: 'Payment verified', data: result });
  }),
};