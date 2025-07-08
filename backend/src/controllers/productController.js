const Product = require("../models/Product");
const User = require("../models/User");

exports.getAllProducts = async (req, res) => {
  try {
    const { location, tags, sort } = req.query;
    let where = {};
    let order = [];

    if (location) where.location = location;
    if (tags) where.tags = { [Op.contains]: [tags] };

    if (sort === "popular") order = [["sold", "DESC"]];
    else if (sort === "lowest") order = [["price", "ASC"]];
    else if (sort === "highest") order = [["price", "DESC"]];

    const products = await Product.findAll({
      where,
      order,
      include: [
        { model: User, as: "farmer", attributes: ["id", "name", "location"] },
      ],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
