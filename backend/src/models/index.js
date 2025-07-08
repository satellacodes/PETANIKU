const { Sequelize } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const Notification = require("./Notification");

// Initialize models
User.initModel(sequelize);
Product.initModel(sequelize);
Order.initModel(sequelize);
Notification.initModel(sequelize);

// Define associations
User.hasMany(Product, {
  foreignKey: "farmerId",
  as: "products",
});
Product.belongsTo(User, {
  foreignKey: "farmerId",
  as: "farmer",
});

User.hasMany(Order, {
  foreignKey: "buyerId",
  as: "buyerOrders",
});
Order.belongsTo(User, {
  foreignKey: "buyerId",
  as: "buyer",
});

User.hasMany(Order, {
  foreignKey: "farmerId",
  as: "farmerOrders",
});
Order.belongsTo(User, {
  foreignKey: "farmerId",
  as: "farmer",
});

User.hasMany(Notification, {
  foreignKey: "userId",
  as: "notifications",
});
Notification.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = {
  sequelize,
  User,
  Product,
  Order,
  Notification,
};
