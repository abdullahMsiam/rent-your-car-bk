import { Router } from 'express';
import { UserController } from './user.controller';
import { auth } from '../../middlewares/auth';

const router = Router();

router.get('/users', auth('ADMIN'), UserController.getAllUsers);
router.patch('/users/:id', auth('ADMIN'), UserController.updateStatus);

export const UserRoutes = router;