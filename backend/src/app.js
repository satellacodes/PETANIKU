require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http"); // Tambahkan modul http
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
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

const corsOptions = {
  origin: ["https://your-address-vercel.com", "http://localhost:3000"],
  credentials: true,
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/buyer", buyerRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/notifications", notificationRoutes); // Tambahkan ini

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

app.use(uploadErrorHandler);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5004;

const server = http.createServer(app);

const setupWebSocket = require("./websocket");
const wss = setupWebSocket(server);
app.set("wss", wss);

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`WebSocket server running on same port`);
});
