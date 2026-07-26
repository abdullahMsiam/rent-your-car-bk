import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
    jwt: {
        secret: process.env.JWT_ACCESS_SECRET || 'access_secret',
        expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '1d',
        refresh_secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
    stripe: {
        secret_key: process.env.STRIPE_SECRET_KEY,
    },
    client_url: process.env.CLIENT_URL || 'http://localhost:3000',
    server_url: process.env.SERVER_URL || 'http://localhost:5000',
};