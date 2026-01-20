const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hello_mysql', 'root', '', {
    host: "localhost",
    dialect: 'mysql',
    port: 3307,
});

module.exports = sequelize;
