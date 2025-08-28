import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/postRoute.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
// Middleware for parsing JSON and URL-encoded bodies with increased limit
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Use 'let' because we want to change this dynamically
let frontendOrigin = "http://localhost:5173";

app.use(
  cors({
    origin: "http://localhost:5173", // or whatever port your frontend runs on
    credentials: true, // allow cookies and auth headers
  })
);

// Middleware for parsing cookies
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute);
app.use("/api/admin", postRoute);

// // Route to dynamically update frontendOrigin (optional)
// app.post("/api/set-frontend-origin", (req, res) => {
//   if (req.body.origin) {
//     frontendOrigin = req.body.origin;
//     console.log(`Frontend origin set to: ${frontendOrigin}`);
//     return res.sendStatus(200);
//   }
//   res.status(400).send("Origin not provided");
// });

// Basic root route for sanity check
app.get("/", (req, res) => {
  res.send("hello user");
});

// Use the PORT provided by Render or fallback to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
