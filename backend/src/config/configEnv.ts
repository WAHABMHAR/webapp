import dotenv from "dotenv";

dotenv.config();

export const configEnv = {
    NODE_ENV: process.env.NODE_ENV || "development",
    port: process.env.LOCAL_PORT || 3000,
    mongoUrl: process.env.LOCAL_MONGO_URL || "mongodb://localhost:27017/test",
    jwtSecret: process.env.JWT_SECRET || "secret",
    jwtExpiration: process.env.JWT_EXPIRATION || "1h",
};