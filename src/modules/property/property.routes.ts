import { Router } from 'express';
import { PropertyController } from './property.controller.js';
import { auth } from '../../middlewares/auth.js';

const router = Router();

router.get('/', PropertyController.getAllProperties);
router.get('/:id', PropertyController.getPropertyById);
router.post('/landlord', auth('LANDLORD'), PropertyController.createProperty);
router.put('/landlord/:id', auth('LANDLORD'), PropertyController.updateProperty);
router.delete('/landlord/:id', auth('LANDLORD'), PropertyController.deleteProperty);

export const PropertyRoutes = router;