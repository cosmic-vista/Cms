import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import postRoute from "./routes/postRoute.js";

// Load environment variables FIRST
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware to parse JSON
// Increase the limit for JSON requests (default is 100KB)
app.use(express.json({ limit: "20mb" }));

// For URL-encoded requests (if you're using traditional form submissions)
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// For parsing cookies
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute);

// defining router for create-post

app.use("/api/admin", postRoute);

let frontendOrigin = "http://localhost:5173";

// Endpoint to receive frontend URL
app.post("/api/set-frontend-origin", (req, res) => {
  if (req.body.origin) {
    frontendOrigin = req.body.origin;
    console.log(`Frontend origin set to: ${frontendOrigin}`);
  }
  res.sendStatus(200);
});

// Basic route
app.get("/", (req, res) => {
  res.send("hello user");
});

// Update CORS to use dynamic origin
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, [frontendOrigin]);
    },
    credentials: true,
  })
);

// Use PORT from env or default to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
