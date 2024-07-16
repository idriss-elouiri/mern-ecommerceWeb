import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import authRouter from "./modules/auth/auth.route.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

connectDb();

app.use(express.json());

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client's origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable cookies and other credentials
  })
);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("/test", (req, res) => {
  res.json({ message: "test success" });
});

app.use("/api/auth", authRouter);

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
