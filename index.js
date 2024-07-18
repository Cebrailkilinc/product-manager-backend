import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./controller/productController.js";
import Product from "./model/productModel.js";

// Environment variables
dotenv.config();

// Express app setup
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
connectDB().then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});

app.get("/", async (req, res) => {
  try {
    console.log("Received request at /");
    const products = await Product.find(); // Asenkron sorgu
    console.log("Fetched products from DB");
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products", err);
    res.status(500).json({ message: err.message });
  }
});

app.use("/product", productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
