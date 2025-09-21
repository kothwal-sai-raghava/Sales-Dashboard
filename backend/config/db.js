const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sales.db', // SQLite file
  logging: false,      // disable SQL logs
});

module.exports = sequelize;
