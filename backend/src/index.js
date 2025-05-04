import express from "express";
import authRoutes from "./routes/auth.route.js"; // don't forget '.js' in local files as we are using type of module
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser());
//cors should be before the routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
