import express from "express";
import { authenticateToken } from "../middlewares/auth.js";
import prisma from "../utils/prisma.js";
const router = express.Router();
// Buat laporan
router.post("/", authenticateToken, async (req, res) => {
  const { type, message } = req.body;
  if (!type || !message)
    return res.status(400).json({ message: "Missing fields" });
  const rep = await prisma.report.create({
    data: { userId: req.user.id, type, message },
  });
  res.json(rep);
});
// Buyer atau farmer bisa lihat laporannya sendiri
router.get("/", authenticateToken, async (req, res) => {
  const reps = await prisma.report.findMany({ where: { userId: req.user.id } });
  res.json(reps);
});
export default router;
