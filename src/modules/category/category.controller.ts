import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { CategoryService } from './category.service';

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