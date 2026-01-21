const { DataTypes } = require('sequelize');
const sequelize = require("../config/Conexion");

const rol = sequelize.define('rol', {
    rl_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    rl_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rl_descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rl_estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
    }
}, {
    tableName: 'rol',
    freezeTableName: true,
    timestamps: false,
    id: false,
});

module.exports = rol;