const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  logging: process.env.NODE_ENV === 'development' ? console.log : true
  },
);
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("DB Error:", error.original || error);
    process.exit(1);
  }
};
module.exports = { sequelize, connectDB };
