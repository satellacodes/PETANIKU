require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const {
  notFound,
  errorHandler,
  uploadErrorHandler,
} = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const buyerRoutes = require("./routes/buyerRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Connect to database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/buyer", buyerRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/products", productRoutes);

// Error handling middleware
app.use(uploadErrorHandler);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
