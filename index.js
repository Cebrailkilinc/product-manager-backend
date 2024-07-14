import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./controller/productController.js"

// Environment variables
dotenv.config();

// Express app setup
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

// MongoDB connection
connectDB();

app.use("/product", productRoutes)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
