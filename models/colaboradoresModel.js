const { DataTypes } = require('sequelize');
const sequelize = require("../config/Conexion");

const colaboradores = sequelize.define('colaboradores', {
    cl_cedula: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    cl_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cl_apellido: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cl_direccion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    cl_estado: {
        type: DataTypes.TINYINT,
        allowNull: false,   
    }
}, {
    tableName: 'colaboradores',
    freezeTableName: true,
    timestamps: false,
    id: false,
});

module.exports = colaboradores;