import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync.js';
import { sendResponse } from '../../utils/sendResponse.js';
import { UserService } from './user.service.js';
// import { UserService } from './user.service.';

export const UserController = {
  getAllUsers: catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllUsers();
    sendResponse(res, { statusCode: 200, success: true, message: 'All users fetched', data: result });
  }),

  updateStatus: catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.updateUserStatus(req.params.id as string, req.body.status);
    sendResponse(res, { statusCode: 200, success: true, message: 'User status updated', data: result });
  }),
};