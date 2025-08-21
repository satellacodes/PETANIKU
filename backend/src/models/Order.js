const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      defaultValue: 'pending',
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'buyerId',
      as: 'buyer'
    });
    Order.belongsTo(models.User, {
      foreignKey: 'farmerId',
      as: 'farmer'
    });
  };

  return Order;
};
