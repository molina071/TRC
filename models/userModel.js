const { DataTypes } = require('sequelize');
const sequelize = require("../config/Conexion");

const usuarios = sequelize.define('usuarios', {
    us_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    us_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rl_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    us_edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    us_correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    us_estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
    }
}, {

    tableName: 'usuarios',
    freezeTableName: true,
    timestamps: false,
    id: false,
});

module.exports = usuarios;