import { ErrorRequestHandler } from 'express';
import config from '../config/index.js';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
        errorDetails: config.env === 'development' ? err : null,
    });
};