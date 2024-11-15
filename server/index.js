//Import Statements
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth .route.js";
import cookieParser from "cookie-parser";
import path from "path";

import dotenv from "dotenv";

//Environment Variable Configuration
dotenv.config();

//Database Connection
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const __dirname = path.resolve();
//Express Application Setup
const app = express();

app.use(express.static(path.join(__dirname, "client", "dist"))); //static files

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(express.json());

app.use(cookieParser());

//Server Listening
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

//Route Handlers
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
