import { Router } from 'express';
import { RentalController } from './rental.controller';
import { auth } from '../../middlewares/auth';

const router = Router();

router.post('/', auth('TENANT'), RentalController.submitRequest);
router.get('/', auth('TENANT', 'LANDLORD'), RentalController.getUserRequests);
router.patch('/landlord/:id', auth('LANDLORD'), RentalController.updateStatus);

export const RentalRoutes = router;