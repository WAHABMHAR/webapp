import dotenv from "dotenv";

dotenv.config();

export const configEnv = {
    NODE_ENV: process.env.NODE_ENV || "development",
    port: process.env.LOCAL_PORT || 3000,
    mongoUrl: process.env.LOCAL_MONGO_URL || "mongodb://localhost:27017/test",
    jwtSecret: process.env.JWT_SECRET || "secret",
    jwtExpiration: process.env.JWT_EXPIRATION || "1h",
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || "",
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
    INGEST_SIGNIN_KEY: process.env.INGEST_SIGNIN_KEY || "",
    

};