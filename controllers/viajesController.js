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
                `SELECT col.cl_nombre, col.cl_cedula
             FROM colaborador_sucursal AS cs
             INNER JOIN colaboradores AS col
             ON cs.cl_cedula = col.cl_cedula
             WHERE cs.sc_id = ? AND col.cl_estado = 1`,
                { replacements: [id], type: sequelize.QueryTypes.SELECT } //aqui no me esta trallendo la cedulaaaa.
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

    createViajes: async (req, res) => {
        const { usuario_vj, sucursal_vj, transportista_vj, costo_vj, vj_recorrido } = req.body;

        if (costo_vj == 0 || costo_vj == null) {
            throw new Error('El costo no puede ser 0');
        }

        if (vj_recorrido > 100 || vj_recorrido <= 0) {
            throw new Error('El recorrido no puede exceder los 100km o estar vacio');
        }

        const results = await sequelize.query(
            `SELECT us_id FROM usuarios
             WHERE us_nombre = ?`,
            { replacements: [usuario_vj], type: sequelize.QueryTypes.SELECT } //aqui no me esta trallendo la cedulaaaa.
        );
        try {
            await viajes.create({ us_id: results[0].us_id, sc_id: sucursal_vj, tr_id: transportista_vj, vj_costo: costo_vj, vj_recorrido: vj_recorrido, vj_estado: 1 });
            res.redirect('/viajes')
        } catch (error) {
            console.error(error);
            res.status(500).send('server error');
        }
    },



};

module.exports = viajesController;