const { Sale, Product, Customer, Order } = require('../models');
const { fn, col, Op } = require('sequelize');
const sequelize = require('../config/db');

// 📊 Revenue & Avg Order Value
const aggregateRevenue = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const sales = await Sale.findAll({
      where: { saleDate: { [Op.between]: [startDate, endDate] } },
      attributes: [
        [fn('SUM', col('totalAmount')), 'totalRevenue'],
        [fn('AVG', col('totalAmount')), 'avgOrderValue']
      ]
    });
    res.json(sales[0].dataValues);
  } catch (error) {
    console.error("Error in aggregateRevenue:", error);
    res.status(500).json({ error: "Error fetching revenue data" });
  }
};

// 🌍 Region Stats
const regionStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const sales = await Sale.findAll({
      where: { saleDate: { [Op.between]: [startDate, endDate] } },
      attributes: [
        'region',
        [fn('SUM', col('totalAmount')), 'totalRevenue']
      ],
      group: ['region']
    });
    res.json(sales.map(s => ({
      region: s.region,
      totalRevenue: s.getDataValue('totalRevenue')
    })));
  } catch (error) {
    console.error("Error in regionStats:", error);
    res.status(500).json({ error: "Error fetching region stats" });
  }
};

// Top Products (based on Order table)
const topProducts = async (req, res) => {
  try {
    const topProducts = await Order.findAll({
      attributes: [
        "productId",
        [fn("COUNT", col("Order.id")), "orderCount"],
      ],
      include: [{ model: Product, attributes: ["name"] }],
      group: ["productId", "Product.id"],
      order: [[col("orderCount"), "DESC"]],
      limit: 5,
    });
    res.json(topProducts);
  } catch (error) {
    console.error("Error in getTopProducts:", error);
    res.status(500).json({ error: "Error fetching top products" });
  }
};

// Top Customers (based on Order table)
const topCustomers = async (req, res) => {
  try {
    const topCustomers = await Order.findAll({
      attributes: [
        "customerId",
        [fn("COUNT", col("Order.id")), "orderCount"],
      ],
      include: [{ model: Customer, attributes: ["name"] }],
      group: ["customerId", "Customer.id"],
      order: [[col("orderCount"), "DESC"]],
      limit: 5,
    });
    res.json(topCustomers);
  } catch (error) {
    console.error("Error in getTopCustomers:", error);
    res.status(500).json({ error: "Error fetching top customers" });
  }
};

module.exports = {
  aggregateRevenue,
  regionStats,
  topProducts,
  topCustomers
};