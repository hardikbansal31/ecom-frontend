import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/product.js";

dotenv.config();

const app = express();

// ✅ Setup CORS before anything else
app.use(
  cors({
    origin: "http://localhost:5173", // Your Vite dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Your routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("E-commerce API is running");
});

const PORT = process.env.PORT || 5000;
app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err.message);
  });

