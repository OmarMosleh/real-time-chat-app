import express from "express";
import authRoutes from "./routes/auth.route.js"; // don't forget '.js' in local files as we are using type of module
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser());

app.use("/api/auth", authRoutes); 
app.use("/api/message", messageRoutes); 

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
