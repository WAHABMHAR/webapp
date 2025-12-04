import routes from "./routes/index.js";
import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";

import { ConnectDb } from "./config/connectDB.js";
import { errorHandler } from "./middlewares/error-handler.js";
import path from "path";
import { configEnv } from "./config/configEnv.js";

const __dirname = path.resolve();

dotenv.config();
// ConnectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);
app.use(errorHandler);

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Success" });
  });

// make our app ready for deployment
if (configEnv.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../admin/dist")));
  
    app.get("/{*any}", (req, res) => {
      res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
    });
  }
app.listen(configEnv.port, () => {
    console.log(`Server is running on port ${configEnv.port}`);
});
