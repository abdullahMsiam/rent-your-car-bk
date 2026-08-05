import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config/index.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import { notFound } from './middlewares/notFound.js';

// Route Imports


import { AuthRoutes } from './modules/auth/auth.routes.js';
import { PropertyRoutes } from './modules/property/property.routes.js';
import { CategoryRoutes } from './modules/category/category.routes.js';
import { RentalRoutes } from './modules/rental/rental.routes.js';
// import { PaymentRoutes } from './modules/payment/payment.routes';
import { ReviewRoutes } from './modules/review/review.routes.js';
import { UserRoutes } from './modules/user/user.routes.js';
import { PaymentRoutes } from './modules/payment/payment.routes.js';

const app: Application = express();

app.use(cors({ 
  origin: config.client_url || "*", 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: ' API Active' });
});

// api routes
app.use('/api/auth', AuthRoutes);
app.use('/api/properties', PropertyRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/rentals', RentalRoutes);
app.use('/api/payments', PaymentRoutes);
app.use('/api/reviews', ReviewRoutes);
app.use('/api/admin', UserRoutes);



app.use(notFound);
app.use(globalErrorHandler);

export default app;