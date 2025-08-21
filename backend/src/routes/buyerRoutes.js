const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');
const { protect, role } = require('../middleware/authMiddleware');

router.get('/products', protect, role(['buyer']), buyerController.getProducts);
router.post('/orders', protect, role(['buyer']), buyerController.createOrder);
router.get('/cart', protect, role(['buyer']), buyerController.getCart);
router.post('/cart', protect, role(['buyer']), buyerController.addToCart);

module.exports = router;
