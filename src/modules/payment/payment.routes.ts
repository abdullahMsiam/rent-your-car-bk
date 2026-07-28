import { Router } from 'express';
import { PaymentController } from './payment.controller.js';
import { auth } from '../../middlewares/auth.js';

const router = Router();

router.post('/create', auth('TENANT'), PaymentController.createPayment);
router.post('/confirm', auth('TENANT'), PaymentController.confirmPayment);

export const PaymentRoutes = router;