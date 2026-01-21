const { DataTypes } = require('sequelize');
const sequelize = require("../config/Conexion");

const sucursales = sequelize.define('sucursales', {
    sc_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    sc_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sc_direccion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sc_estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
    }
}, {
    tableName: 'sucursales',
    freezeTableName: true,
    timestamps: false,
    id: false,
});

module.exports = sucursales;