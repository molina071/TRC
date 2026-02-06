const express = require('express');
const app = express();
const viajesModel = require('../models/viajesModel');
const sequelize = require('../config/Conexion');
const viajes = require('../models/viajesModel');


const reportesController = {

    getAllViajes: async (req, res) => {
        try {
            const results = await sequelize.query(
                `SELECT us.us_nombre,
                   suc.sc_nombre,
                   tr.tr_nombre,
                   vj.vj_costo,
                   vj.vj_recorrido,
                   DATE(vj.vj_fecha) AS vj_fecha FROM viajes AS vj
            INNER JOIN usuarios AS us
              ON us.us_id = vj.us_id
            INNER JOIN sucursales AS suc 
              ON suc.sc_id = vj.sc_id
            INNER JOIN transportistas AS tr
              ON tr.tr_id = vj.tr_id`,
                { type: sequelize.QueryTypes.SELECT }
            );

            res.render('reportes', {via: results})

        } catch (error) {
            console.error(error);
            res.status(500).send('Upps.. algo fallo')
        }
    },

}


module.exports = reportesController;