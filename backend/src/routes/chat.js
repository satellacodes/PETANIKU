import express from "express";
import { authenticateToken } from "../middlewares/auth.js";
import prisma from "../utils/prisma.js";
const router = express.Router();
// Get chat history antara dua user
router.get("/:otherUserId", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const otherId = req.params.otherUserId;
  const messages = await prisma.chatMessage.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: otherId },
        { senderId: otherId, receiverId: userId },
      ],
    },
    orderBy: { timestamp: "asc" },
  });
  res.json(messages);
});
export default router;
