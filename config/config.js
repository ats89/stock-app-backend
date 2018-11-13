require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'stock_dev',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: 'Sequelize.Op',
  },
  test: {
    username: 'root',
    password: process.env.TRAVIS ? '' : 'root',
    database: 'stock_test',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: 'Sequelize.Op',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: 'Sequelize.Op',
  },
};
