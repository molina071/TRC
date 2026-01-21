const { DataTypes } = require('sequelize');
const sequelize = require("../config/Conexion");

const colaborador_sucursal = sequelize.define('colaborador_sucursal', {
    cl_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    sc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    }
}, {
    tableName: 'colaborador_sucursal',
    freezeTableName: true,
    timestamps: false,
    id: false,
});

module.exports = colaborador_sucursal;