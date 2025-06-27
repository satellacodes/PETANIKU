const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const chatRoutes = require("./routes/chat");
const reportRoutes = require("./routes/report");
const adminRoutes = require("./routes/admin");
const { authenticateSocket } = require("./socket/authSocket");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL } });

// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);

// Socket.IO
io.use(authenticateSocket);
io.on("connection", (socket) => {
  const userId = socket.user.id;
  socket.join(userId);
  socket.on("private_message", async ({ toUserId, message }) => {
    // save to DB omitted for brevity
    io.to(toUserId).emit("private_message", {
      from: userId,
      message,
      timestamp: new Date(),
    });
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
