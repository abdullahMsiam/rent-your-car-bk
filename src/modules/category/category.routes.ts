import { Router } from 'express';
import { CategoryController } from './category.controller.js';
import { auth } from '../../middlewares/auth.js';

const router = Router();

router.get('/', CategoryController.getAll);
router.post('/', auth('ADMIN'), CategoryController.create);

export const CategoryRoutes = router;