const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');

// Customer Model
const Customer = sequelize.define('Customer', {
  name: { type: DataTypes.STRING, allowNull: false },
  region: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false }
});

// Product Model
const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false }
});

// Sale Model
const Sale = sequelize.define('Sale', {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  saleDate: { type: DataTypes.DATE, allowNull: false },
  region: { type: DataTypes.STRING, allowNull: false },
  channel: { type: DataTypes.STRING, allowNull: false }
});

// 📊 Order Model: A sales transaction between a customer and a product.
const Order = sequelize.define('Order', {
  // Explicitly define foreign key columns
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  },
  customerId: {
    type: DataTypes.INTEGER,
    references: {
      model: Customer,
      key: 'id'
    }
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

// Associations
Customer.hasMany(Sale);
Sale.belongsTo(Customer);
Product.hasMany(Sale);
Sale.belongsTo(Product);

Order.belongsTo(Customer, { foreignKey: 'customerId' });
Customer.hasMany(Order, { foreignKey: 'customerId' });

Order.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Order, { foreignKey: 'productId' });

// Sync DB
const syncDb = async () => await sequelize.sync({ force: true });

module.exports = { sequelize, Customer, Product, Sale, Order, syncDb };