const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
         min: 0
        }
      },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: 'farmerId',
      as: 'farmer'
    });
  };


  return Product;
};
