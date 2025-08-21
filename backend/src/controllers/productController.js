const { Product, User } = require("../models");

exports.getAllProducts = async (req, res) => {
  try {
    const { location, tag, sort, search } = req.query;
    const where = {};
    const order = [];
    const include = []; // Tambahkan inisialisasi include

    if (location) where["$farmer.location$"] = location;
    if (tag) where.tags = { [Op.contains]: [tag] };
    if (search) where.name = { [Op.iLike]: `%${search}%` };

    if (sort === "popular") order.push(["sold", "DESC"]);
    else if (sort === "lowest") order.push(["price", "ASC"]);
    else if (sort === "highest") order.push(["price", "DESC"]);
    else if (sort === "newest") order.push(["createdAt", "DESC"]);
    else if (sort === "oldest") order.push(["createdAt", "ASC"]);

    include.push({
      model: User,
      as: "farmer",
      attributes: ["id", "name", "location"],
      where: { role: "farmer" }
    });

    const products = await Product.findAll({
      where,
      order,
      include
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ 
      message: "Failed to fetch products", 
      error: error.message 
    });
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
      tags: tags.split(","),
      image: `/uploads/${req.file.filename}`,
      farmerId,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
