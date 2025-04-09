import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// ✅ add .js if using ESM
// Load environment variables FIRST
dotenv.config(); // ✅ should come before anything that uses env vars

// Connect to MongoDB
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // your frontend URL
  })
);

// Middleware to parse JSON
app.use(express.json());

// this is for parsing cookies
app.use(cookieParser());

app.use("/api/auth", userRoutes);

let frontendOrigin = "http://localhost:5173"; // Default fallback

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
