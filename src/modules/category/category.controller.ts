import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { CategoryService } from './category.service.js';

export const CategoryController = {
    getAll: catchAsync(async (req: Request, res: Response) => {
        const result = await CategoryService.getAllCategories();
        sendResponse(res, { statusCode: 200, success: true, message: 'Categories fetched', data: result });
    }),

    create: catchAsync(async (req: Request, res: Response) => {
        const result = await CategoryService.createCategory(req.body);
        sendResponse(res, { statusCode: 201, success: true, message: 'Category created', data: result });
    }),
};