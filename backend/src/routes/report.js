const router = require("express").Router();
const { authenticateToken } = require("../middleware/auth");
const ctrl = require("../controllers/reportController");
router.post("/", authenticateToken, ctrl.createReport);
router.get("/", authenticateToken, ctrl.getMyReports);
module.exports = router;
