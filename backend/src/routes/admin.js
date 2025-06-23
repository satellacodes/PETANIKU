import express from "express";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.js";
import prisma from "../utils/prisma.js";
const router = express.Router();
router.use(authenticateToken, authorizeRoles("ADMIN"));
// CRUD user

router.get(
  "/sales",
  authenticateToken,
  authorizeRoles("FARMER"),
  async (req, res) => {
    const farmerId = req.user.id;
    const { from, to, interval } = req.query;
    // from, to: ISO date strings; interval: 'day'/'month'
    // Gunakan raw SQL aggregate:
    const rows = await prisma.$queryRaw`
    SELECT date_trunc(${interval}, o."createdAt") AS period,
           SUM(oi.quantity * oi."priceAtOrder") AS total_sales
    FROM "OrderItem" oi
    JOIN "Order" o ON oi."orderId" = o.id
    JOIN "Product" p ON oi."productId" = p.id
    WHERE p."farmerId" = ${farmerId}
      AND o."createdAt" BETWEEN ${new Date(from)} AND ${new Date(to)}
      AND o.status IN ('PAID','SHIPPED','DELIVERED')
    GROUP BY period
    ORDER BY period;
  `;
    res.json(rows);
  },
);

router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, fullName: true, email: true, role: true, origin: true },
  });
  res.json(users);
});
router.put("/users/:id", async (req, res) => {
  const { role, fullName, origin } = req.body;
  const data = {};
  if (role) data.role = role;
  if (fullName) data.fullName = fullName;
  if (origin) data.origin = origin;
  const updated = await prisma.user.update({
    where: { id: req.params.id },
    data,
  });
  res.json(updated);
});
router.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
});
// CRUD product (bisa hapus produk bermasalah)
router.get("/products", async (req, res) => {
  const prods = await prisma.product.findMany({ include: { farmer: true } });
  res.json(prods);
});
router.delete("/products/:id", async (req, res) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ message: "Deleted" });
});
// Lihat semua laporan
router.get("/reports", async (req, res) => {
  const reps = await prisma.report.findMany({ include: { user: true } });
  res.json(reps);
});
router.put("/reports/:id", async (req, res) => {
  const { status } = req.body;
  const updated = await prisma.report.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json(updated);
});
export default router;
