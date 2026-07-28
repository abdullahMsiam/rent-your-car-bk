import { Router } from 'express';
import { ReviewController } from './review.controller.js';
import { auth } from '../../middlewares/auth.js';

const router = Router();

router.post('/', auth('TENANT'), ReviewController.create);

export const ReviewRoutes = router;