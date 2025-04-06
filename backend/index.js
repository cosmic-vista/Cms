import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

// ✅ add .js if using ESM
// Load environment variables FIRST
dotenv.config(); // ✅ should come before anything that uses env vars

// Connect to MongoDB
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5175",
    credentials: true, // your frontend URL
  })
);

// Middleware to parse JSON
app.use(express.json());

app.use("/api/auth", userRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("hello user");
});

// Use PORT from env or default to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
