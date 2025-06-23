import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authenticateSocket = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Token missing"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new Error("Invalid token"));
    socket.user = user;
    next();
  });
};
