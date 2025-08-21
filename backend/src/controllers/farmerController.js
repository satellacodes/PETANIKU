const { Product, Order, Notification , Users } = require("../models");
const upload = require("../utils/upload");

exports.getMyProducts = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const products = await Product.findAll({
      where: { farmerId },
      order: [["createdAt", "DESC"]],
    });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get products", error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, tags } = req.body;
    const farmerId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const product = await Product.create({
      name,
      price,
      tags: tags.split(",").map((tag) => tag.trim()),
      image: `/uploads/${req.file.filename}`,
      farmerId,
    });

    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const farmerId = req.user.id;
    const { name, price, tags } = req.body;

    const product = await Product.findOne({
      where: { id, farmerId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    if (tags) product.tags = tags.split(",").map((tag) => tag.trim());

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const farmerId = req.user.id;

    const product = await Product.findOne({
      where: { id, farmerId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const orders = await Order.findAll({
      where: { farmerId },
      include: [
        {
          model: User,
          as: "buyer",
          attributes: ["id", "name", "email", "phone"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get orders", error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const farmerId = req.user.id;

    const order = await Order.findOne({
      where: { id, farmerId },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    order.status = status;
    await order.save();

    // Create notification for buyer
    await Notification.create({
      userId: order.buyerId,
      message: `Your order #${order.id} has been ${status}`,
      type: "order",
      referenceId: order.id,
    });

    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update order status", error: error.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notification.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(notifications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get notifications", error: error.message });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOne({
      where: { id, userId },
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.read = true;
    await notification.save();
    res.json(notification);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to mark notification as read",
        error: error.message,
      });
  }
};

exports.getFarmerProfile = async (req, res) => {
  try {
    const farmerId = req.params.id;
    const farmer = await User.findByPk(farmerId, {
      attributes: ['id', 'name', 'email', 'phone', 'location', 'description'],
      where: { role: 'farmer' }
    });

    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    res.json(farmer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch farmer profile', error: error.message });
  }
};

exports.getFarmerProducts = async (req, res) => {
  try {
    const farmerId = req.params.id;
    const products = await Product.findAll({
      where: { farmerId },
      attributes: ['id', 'name', 'image', 'price', 'tags']
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch farmer products', error: error.message });
  }
};

exports.updateProductStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body; // Dapatkan nilai stok baru dari request body
    const farmerId = req.user.id; // ID farmer dari token

    const product = await Product.findOne({
      where: { id, farmerId }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.stock = stock;
    await product.save();

    res.json({
      id: product.id,
      name: product.name,
      stock: product.stock,
      message: "Stock updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update stock",
      error: error.message
    });
  }
};

