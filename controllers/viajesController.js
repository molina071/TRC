const express = require('express');
const app = express();
const viajes = require('../models/viajesModel');
const sucursaless = require('../models/sucursalesModel');
const transportistas = require('../models/transportistasModel');
const Colaboradores = require('../models/colaboradoresModel');
const colaboradoress = require('../models/suc_col_Model');
const sequelize = require('../config/Conexion');


const viajesController = {


    render: async (req, res) => {
        try {
            const Viajes = await viajes.findAll();
            res.render('viajes', { Viajes });
        } catch (error) {

        }
    },

    renderizarViajes: async (req, res) => {
        const { id } = req.params;
        try {


            const results = await sequelize.query(
                `SELECT col.cl_nombre
             FROM colaborador_sucursal AS cs
             INNER JOIN colaboradores AS col
             ON cs.cl_cedula = col.cl_cedula
             WHERE cs.sc_id = ?`,
                { replacements: [id], type: sequelize.QueryTypes.SELECT }
            );

            res.json(results);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener colaboradores' });
        }

    },


    obtenerDistancia: async (req, res) => {
        const { cedula, sucursal } = req.params; // cedula y sucursal id desde la ruta
        try {
            const results = await sequelize.query(
                `SELECT cs.distancia
                 FROM colaborador_sucursal AS cs
                 WHERE cs.cl_cedula = ? AND cs.sc_id = ?`,
                { replacements: [cedula, sucursal], type: sequelize.QueryTypes.SELECT }
            );

            if (results.length === 0) {
                return res.status(404).json({ message: 'No se encontró distancia para ese colaborador/sucursal' });
            }

            // Como la PK compuesta garantiza un único resultado, tomamos el primero
            res.json({ distancia: results[0].distancia });

        } catch (error) {
            res.status(500).json({ error: 'Error al obtener colaboradores' });
        }

    },







};

module.exports = viajesController;