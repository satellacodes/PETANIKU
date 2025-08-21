const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
const upload = require('../utils/upload');
const { protect, role } = require('../middleware/authMiddleware');

router.get('/products', protect, role(['farmer']), farmerController.getMyProducts);
router.post('/products', protect, role(['farmer']), upload.single('image'), farmerController.createProduct);
router.put('/products/:id', protect, role(['farmer']), upload.single('image'), farmerController.updateProduct);
router.delete('/products/:id', protect, role(['farmer']), farmerController.deleteProduct);
router.get('/orders', protect, role(['farmer']), farmerController.getOrders);
router.put('/orders/:id', protect, role(['farmer']), farmerController.updateOrderStatus);
router.get('/notifications', protect, role(['farmer']), farmerController.getNotifications);
router.put('/notifications/:id/read', protect, role(['farmer']), farmerController.markNotificationAsRead);
router.get('/profile/:id', farmerController.getFarmerProfile);
router.get('/products/:id', farmerController.getFarmerProducts);
router.put(
  '/products/:id/stock', 
  protect, 
  role(['farmer']), 
  farmerController.updateProductStock
);

module.exports = router;
