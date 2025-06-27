const router = require("express").Router();
const { authenticateToken } = require("../middleware/auth");
const { authorize } = require("../middleware/roles");
const ctrl = require("../controllers/orderController");
router.post("/", authenticateToken, authorize("BUYER"), ctrl.createOrder);
router.put("/:id/status", authenticateToken, ctrl.updateOrderStatus);
router.get("/", authenticateToken, ctrl.getOrders);
module.exports = router;
