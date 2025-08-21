const { sequelize } = require('../config/db');
const defineUser = require('./User');
const defineProduct = require('./Product');
const defineOrder = require('./Order');
const defineNotification = require('./Notification');

const User = defineUser(sequelize);
const Product = defineProduct(sequelize);
const Order = defineOrder(sequelize);
const Notification = defineNotification(sequelize);

const models = {
  User,
  Product,
  Order,
  Notification
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});


module.exports = {
  sequelize,
  User,
  Product,
  Order,
  Notification
};
