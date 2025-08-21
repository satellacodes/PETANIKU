const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, notificationController.getNotifications);
router.get('/:id', protect, notificationController.getNotificationById);
router.put('/:id/read', protect, notificationController.markNotificationAsRead);
router.get('/unread-count', protect, notificationController.getUnreadCount);
router.post('/', protect, notificationController.createNotification);
router.delete('/:id', protect, notificationController.deleteNotification);

module.exports = router;
