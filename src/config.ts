import dotenv from 'dotenv';
dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD || 'default_password';
const JWT_CREATOR_PASSWORD = process.env.JWT_ADMIN_PASSWORD || 'default_admin_password';
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase';

export { JWT_CREATOR_PASSWORD, JWT_USER_PASSWORD, MONGO_URL };