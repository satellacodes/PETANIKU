import express from "express";
import multer from "multer";
import path from "path";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.js";
import prisma from "../utils/prisma.js";
const router = express.Router();
// Konfigurasi multer: simpan lokal di /uploads dengan limit 4MB
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/"))
      return cb(new Error("File harus gambar"));
    cb(null, true);
  },
});
// Create product (petani)
router.post(
  "/",
  authenticateToken,
  authorizeRoles("FARMER"),
  upload.single("image"),
  async (req, res) => {
    const { name, price, description } = req.body;
    const imageUrl = req.file
      ? `${process.env.BACKEND_URL}/uploads/${req.file.filename}`
      : null;
    if (!name || !price)
      return res.status(400).json({ message: "Missing fields" });
    const prod = await prisma.product.create({
      data: {
        name,
        price: parseInt(price),
        description,
        imageUrl,
        farmerId: req.user.id,
      },
    });
    res.json(prod);
  },
);
// Read all products (dengan optional sorting by jarak)
router.get(
  "/",
  authenticateToken,
  authorizeRoles("BUYER", "FARMER", "ADMIN"),
  async (req, res) => {
    // Query params: lat, lng
    const { lat, lng } = req.query;
    let products = [];
    if (lat && lng) {
      // Hitung jarak: join User (farmer) yang punya latitude & longitude
      // Haversine formula di SQL
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      products = await prisma.$queryRaw`
      SELECT p.*,
      u.latitude as farmer_lat, u.longitude as farmer_lng,
      (
        6371 * acos(
          cos(radians(${latitude})) * cos(radians(u.latitude))
          * cos(radians(u.longitude) - radians(${longitude}))
          + sin(radians(${latitude})) * sin(radians(u.latitude))
        )
      ) as distance
      FROM "Product" p
      JOIN "User" u ON p."farmerId" = u.id
      ORDER BY distance
      LIMIT 100;
    `;
    } else {
      products = await prisma.product.findMany({ take: 100 });
    }
    res.json(products);
  },
);
// Read single product
router.get("/:id", authenticateToken, async (req, res) => {
  const prod = await prisma.product.findUnique({
    where: { id: req.params.id },
  });
  if (!prod) return res.status(404).json({ message: "Not found" });
  res.json(prod);
});
// Update product (petani)
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("FARMER"),
  upload.single("image"),
  async (req, res) => {
    const prod = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (!prod || prod.farmerId !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });
    const data = {};
    ["name", "price", "description"].forEach((field) => {
      if (req.body[field])
        data[field] =
          field === "price" ? parseInt(req.body[field]) : req.body[field];
    });
    if (req.file) {
      data.imageUrl = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;
    }
    const updated = await prisma.product.update({
      where: { id: req.params.id },
      data,
    });
    res.json(updated);
  },
);
// Delete product (petani)
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("FARMER"),
  async (req, res) => {
    const prod = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (!prod || prod.farmerId !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  },
);
export default router;
