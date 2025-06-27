const router = require("express").Router();
const { authenticateToken } = require("../middleware/auth");
const ctrl = require("../controllers/chatController");
router.get("/:otherUserId", authenticateToken, ctrl.getChatHistory);
module.exports = router;
