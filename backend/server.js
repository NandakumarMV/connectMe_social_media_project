import express from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", userRoutes);
const server = app.listen(port, () =>
  console.log(`server started on port ${port}`)
);
