import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { PropertyService } from './property.service';
import { AuthRequest } from '../../middlewares/auth';

export const PropertyController = {
    getAllProperties: catchAsync(async (req: Request, res: Response) => {
        const result = await PropertyService.getAllProperties(req.query);
        sendResponse(res, { statusCode: 200, success: true, message: 'Properties fetched', data: result });
    }),

    getPropertyById: catchAsync(async (req: Request, res: Response) => {
        const result = await PropertyService.getPropertyById(req.params.id as string);
        sendResponse(res, { statusCode: 200, success: true, message: 'Property details fetched', data: result });
    }),

    createProperty: catchAsync(async (req: AuthRequest, res: Response) => {
        const result = await PropertyService.createProperty(req.user!.id, req.body);
        sendResponse(res, { statusCode: 201, success: true, message: 'Property listed successfully', data: result });
    }),

    updateProperty: catchAsync(async (req: AuthRequest, res: Response) => {
        const result = await PropertyService.updateProperty(req.params.id as string, req.user!.id, req.body);
        sendResponse(res, { statusCode: 200, success: true, message: 'Property updated', data: result });
    }),

    deleteProperty: catchAsync(async (req: AuthRequest, res: Response) => {
        await PropertyService.deleteProperty(req.params.id as string, req.user!.id);
        sendResponse(res, { statusCode: 200, success: true, message: 'Property removed', data: null });
    }),
};