import express from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.js";
import prisma from "../utils/prisma.js";
const router = express.Router();
// Buat order: buyer klik beli langsung atau add to cart & checkout
router.post(
  "/",
  authenticateToken,
  authorizeRoles("BUYER"),
  async (req, res) => {
    const { items } = req.body; // [{ productId, quantity }]
    if (!items || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: "No items" });
    // Cek availability, harga
    let total = 0;
    const orderItemsData = [];
    for (const it of items) {
      const prod = await prisma.product.findUnique({
        where: { id: it.productId },
      });
      if (!prod) return res.status(400).json({ message: "Product not found" });
      orderItemsData.push({
        productId: prod.id,
        quantity: it.quantity,
        priceAtOrder: prod.price,
      });
      total += prod.price * it.quantity;
    }
    // Buat order
    const order = await prisma.order.create({
      data: {
        buyerId: req.user.id,
        status: "PENDING",
        items: { create: orderItemsData },
      },
      include: { items: true },
    });
    res.json(order);
  },
);
// Update status order (petani bisa ubah statusnya jadi SHIPPED, PRODUKSI?; buyer bisa cancel)
router.put("/:id/status", authenticateToken, async (req, res) => {
  const { status } = req.body;
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: { items: { include: { product: true } } },
  });
  if (!order) return res.status(404).json({ message: "Not found" });
  // Jika petani: hanya boleh update orders yang melibatkan produknya
  if (req.user.role === "FARMER") {
    const owns = order.items.some((it) => it.product.farmerId === req.user.id);
    if (!owns) return res.status(403).json({ message: "Forbidden" });
    // Ijinkan ubah PENDING->SHIPPED, SHIPPED->DELIVERED, dst sesuai alur
  }
  // Jika buyer: hanya boleh cancel sebelum SHIPPED
  // Implementasi detail validasi status...
  const updated = await prisma.order.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json(updated);
});
// Get orders untuk buyer atau farmer
router.get("/", authenticateToken, async (req, res) => {
  if (req.user.role === "BUYER") {
    const orders = await prisma.order.findMany({
      where: { buyerId: req.user.id },
      include: { items: { include: { product: true } } },
    });
    return res.json(orders);
  }
  if (req.user.role === "FARMER") {
    // semua orders di mana ada item produk milik petani ini
    const orders = await prisma.order.findMany({
      where: {
        items: {
          some: {
            product: { farmerId: req.user.id },
          },
        },
      },
      include: { items: { include: { product: true } }, buyer: true },
    });
    return res.json(orders);
  }
  res.status(403).json({ message: "Forbidden" });
});
export default router;
