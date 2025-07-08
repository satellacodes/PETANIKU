const { Order, Product, Notification, User } = require("../models");
const { Op } = require("sequelize");

exports.getProducts = async (req, res) => {
  try {
    const { location, tag, sort, search } = req.query;
    const where = {};
    const order = [];

    if (location) where["$farmer.location$"] = location;
    if (tag) where.tags = { [Op.contains]: [tag] };
    if (search) where.name = { [Op.iLike]: `%${search}%` };

    if (sort === "popular") order.push(["sold", "DESC"]);
    else if (sort === "lowest") order.push(["price", "ASC"]);
    else if (sort === "highest") order.push(["price", "DESC"]);
    else if (sort === "newest") order.push(["createdAt", "DESC"]);
    else if (sort === "oldest") order.push(["createdAt", "ASC"]);

    const products = await Product.findAll({
      where,
      order,
      include: [
        {
          model: User,
          as: "farmer",
          attributes: ["id", "name", "location"],
          where: { role: "farmer" },
        },
      ],
    });

    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const buyerId = req.user.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    // Calculate total and validate products
    let total = 0;
    const farmerIds = new Set();
    const productIds = items.map((item) => item.productId);

    const products = await Product.findAll({
      where: { id: { [Op.in]: productIds } },
    });

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${item.productId} not found` });
      }
      farmerIds.add(product.farmerId);
      total += product.price * item.quantity;
    }

    if (farmerIds.size > 1) {
      return res
        .status(400)
        .json({ message: "All products must be from the same farmer" });
    }

    const farmerId = Array.from(farmerIds)[0];
    const order = await Order.create({
      buyerId,
      farmerId,
      items,
      total,
      status: "pending",
    });

    // Create notification for farmer
    const buyer = await User.findByPk(buyerId);
    const notification = await Notification.create({
      userId: farmerId,
      message: `New order from ${buyer.name} for Rp${total.toLocaleString()}`,
      type: "order",
      referenceId: order.id,
    });

    // Emit real-time notification (to be implemented with WebSocket)

    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    // In a real app, this would fetch from a cart model
    // For simplicity, we'll return an empty array
    res.json([]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get cart", error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    // In a real app, this would add to a cart model
    // For simplicity, we'll return success
    res.json({ message: "Item added to cart" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add to cart", error: error.message });
  }
};
