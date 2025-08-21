const { Notification } = require('../models');
const { Op } = require('sequelize');

exports.getNotifications = async (req, res) => {
  try {
    const { referenceId } = req.query;
    const where = { userId: req.user.id };
    
    if (referenceId) {
      where.referenceId = referenceId;
    }

    const notifications = await Notification.findAll({
      where,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'message', 'read', 'type', 'referenceId', 'createdAt']
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get notifications', error: error.message });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get notification', error: error.message });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    await notification.save();
    
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark notification as read', error: error.message });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.count({
      where: { 
        userId: req.user.id,
        read: false
      }
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get unread count', error: error.message });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { message, type, referenceId } = req.body;
    const notification = await Notification.create({
      userId: req.user.id,
      message,
      type,
      referenceId,
      read: false
    });
    if (req.app.get('wss')) {
      req.app.get('wss').clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client.userId === req.user.id) {
          client.send(JSON.stringify({
            type: 'notification',
            data: notification
          }));
        }
      });
    }
    
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create notification', error: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await notification.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notification', error: error.message });
  }
};
