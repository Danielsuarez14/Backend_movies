import dotenv from 'dotenv'

dotenv.config()
export const PORT = process.env.PORT || 3001
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'My_admin1'
export const DB_NAME = process.env.DB_NAME || 'bestbooks'
export const JWT_SECRET = process.env.JWT_SECRET_KEY