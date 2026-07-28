import { Router } from 'express';
import { RentalController } from './rental.controller.js';
import { auth } from '../../middlewares/auth.js';

const router = Router();

router.post('/', auth('TENANT'), RentalController.submitRequest);
router.get('/', auth('TENANT', 'LANDLORD'), RentalController.getUserRequests);
router.patch('/landlord/:id', auth('LANDLORD'), RentalController.updateStatus);

export const RentalRoutes = router;