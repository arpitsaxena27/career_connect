import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { router as homeRoute } from "./routes/home.js";
import { router as studentRoute } from "./routes/student.js";
import { router as uniRoute } from "./routes/uni.js";
import { router as accountRoute } from "./routes/account.js";
import { router as analyticsRoute } from "./routes/analytics.js";
import { validateAuthToken } from "./middlewares/authCookie.js";
import { checkAuth } from "./middlewares/checkAuth.js";
import { connectDB } from "./config/db.js";
import "dotenv/config";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

connectDB(MONGO_URI)
      .then(() => {
            console.log("Connected to MongoDB");
      })
      .catch((err) => {
            console.log("Error connecting to MongoDB", err);
      });

app.use(
      cors({
            origin: process.env.FRONTEND_URL || "http://localhost:3000",
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true, // Allow cookies
            allowedHeaders: ["Content-Type", "Authorization"],
      })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(validateAuthToken());

app.use(checkAuth);

app.use("/", homeRoute);
app.use("/account", accountRoute);
app.use("/analytics", analyticsRoute);
app.use("/student", studentRoute);
app.use("/uni", uniRoute);
app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
});
