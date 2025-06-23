import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // { id, role }
    next();
  });
};
export const authorizeRoles =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ message: "Not authenticated" });
    if (!allowedRoles.includes(req.user.role))
      return res
        .status(403)
        .json({ message: "Forbidden: insufficient rights" });
    next();
  };
