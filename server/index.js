import path from "path";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectdb } from "./utils/connectDb.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { v2 as cloudinary } from "cloudinary";
// Import routes
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js";
import notiRoutes from "./routes/noti.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import { app, server } from "./socket/socket.js";
dotenv.config({});
//const app = express();

const __dirname = path.resolve();
// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
const allowedOrigins = process.env.CORS_ORIGIN.split(",");
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: Not allowed origin"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const port = process.env.PORT || 5000;
app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/notification", notiRoutes);
app.use("/api/applications", applicationRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}
connectdb().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
