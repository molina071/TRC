const { DataTypes } = require('sequelize');
const sequelize = require("../config/Conexion");

const transportistas = sequelize.define('transportistas', {
    tr_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    tr_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tr_tarifa: {
        type: DataTypes.DECIMAL(7,2),
        allowNull: false,
    },
    tr_estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
    }
}, {

    tableName: 'transportistas',
    freezeTableName: true,
    timestamps: false,
    id: false,
});

module.exports = transportistas;