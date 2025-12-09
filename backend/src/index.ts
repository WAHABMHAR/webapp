import routes from "./routes/index.js";
import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";

import { clerkMiddleware } from '@clerk/express'

import { ConnectDb } from "./config/connectDB.js";
import { errorHandler } from "./middlewares/error-handler.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { configEnv } from "./config/configEnv.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
ConnectDb();

const app = express();
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);
app.use(errorHandler);

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy", status: "ok" });
});

// make our app ready for deployment
if (configEnv.NODE_ENV === "production") {
    const adminDistPath = path.join(__dirname, "../admin/dist");
    app.use(express.static(adminDistPath));
    
    // Serve SPA - all non-API routes serve index.html
    app.get("*", (req, res) => {
        // Don't serve index.html for API routes
        if (!req.path.startsWith("/api")) {
            res.sendFile(path.join(adminDistPath, "index.html"));
        }
    });
}
app.listen(configEnv.port, () => {
    console.log(`Server is running on port ${configEnv.port}`);
});
