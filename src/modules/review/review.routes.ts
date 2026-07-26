import { Router } from 'express';
import { ReviewController } from './review.controller';
import { auth } from '../../middlewares/auth';

const router = Router();

router.post('/', auth('TENANT'), ReviewController.create);

export const ReviewRoutes = router;