const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sistema_viajes', 'root', '', {
    host: "localhost",
    dialect: 'mysql',
    port: 3306,
  
});

module.exports = sequelize;
