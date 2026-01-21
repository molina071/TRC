const { DataTypes } = require('sequelize');
const sequelize = require("../config/Conexion");

const viajes = sequelize.define('viajes', {
    vj_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    us_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cl_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tr_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vj_costo: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false,
    },
    vj_fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    vj_estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
    }
}, {

    tableName: 'viajes',
    freezeTableName: true,
    timestamps: false,
    id: false,
});

module.exports = viajes;