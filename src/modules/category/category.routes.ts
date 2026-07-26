import { Router } from 'express';
import { CategoryController } from './category.controller';
import { auth } from '../../middlewares/auth';

const router = Router();

router.get('/', CategoryController.getAll);
router.post('/', auth('ADMIN'), CategoryController.create);

export const CategoryRoutes = router;