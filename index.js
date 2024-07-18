import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./controller/productController.js"
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
app.use(express.json())
app.use(express.static('public'))


// MongoDB connection
connectDB();


app.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Asenkron sorgu
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use("/", productRoutes)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
