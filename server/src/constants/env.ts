import dotenv from "dotenv-flow";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGO_DB_URL = process.env.MONGO_DB_URL || "";
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "";
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const JWT_EXPIRY = process.env.JWT_EXPIRY || "";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
