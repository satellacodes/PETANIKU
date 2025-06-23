import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import chatRoutes from "./routes/chat.js";
import reportRoutes from "./routes/report.js";
import adminRoutes from "./routes/admin.js";
import { authenticateSocket } from "./socket/authSocket.js";
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: process.env.FRONTEND_URL, methods: ["GET", "POST"] },
});
// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
// Static folder untuk gambar jika menggunakan local storage
app.use("/uploads", express.static("uploads"));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
// Socket.IO untuk chat real-time
io.use(authenticateSocket); // middleware untuk memvalidasi token
io.on("connection", (socket) => {
  const userId = socket.user.id;
  // join a personal room
  socket.join(userId);
  socket.on("private_message", ({ toUserId, message }) => {
    // simpan ke DB
    // broadcast ke penerima
    io.to(toUserId).emit("private_message", {
      from: userId,
      message,
      timestamp: new Date(),
    });
  });
  socket.on("disconnect", () => {
    // handle disconnect jika perlu
  });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
