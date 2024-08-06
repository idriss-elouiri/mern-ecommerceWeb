import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import authRouter from "./modules/auth/auth.route.js";
import userRouter from "./modules/user/user.route.js";
import productRouter from "./modules/product/product.route.js";
import commentRouter from "./modules/comment/comment.route.js";
import categoryRouter from "./modules/category/category.route.js";
import checkoutRouter from "./modules/checkout/checkout.route.js";
import orderRouter from "./modules/order/order.route.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

connectDb();

app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'client/dist')));

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your client's origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable cookies and other credentials
  })
);


app.get("/test", (req, res) => {
  res.json({ message: "test success" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/comment", commentRouter);
app.use("/api/category", categoryRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/order", orderRouter);


app.listen(3005, () => {
  console.log("Server is running on port 3005!");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
