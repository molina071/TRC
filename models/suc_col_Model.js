const { DataTypes } = require('sequelize');
const sequelize = require("../config/Conexion");

const colaborador_sucursal = sequelize.define('colaborador_sucursal', {
    cl_cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    sc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    distancia: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'colaborador_sucursal',
    freezeTableName: true,
    timestamps: false,
    id: false,  
});

module.exports = colaborador_sucursal;