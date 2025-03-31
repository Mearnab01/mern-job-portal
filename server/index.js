import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectdb } from "./utils/connectDb.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Import routes
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js";
import notiRoutes from "./routes/noti.routes.js";
import applicationRoutes from "./routes/application.routes.js";

dotenv.config({});
const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
const port = process.env.PORT || 5000;
app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/notification", notiRoutes);
app.use("/api/applications", applicationRoutes);

app.use(errorHandler);
connectdb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
