const express = require('express');
const router = express.Router();
const app = express();
const sucursal = require('../models/sucursalesModel');

const sucursalController = {

    getAllSucursales: async (req, res) => {
        try {
            const sucursales = await sucursal.findAll({
                where: { sc_estado: 1 }
            });
            res.render('sucursales', { sucursales });

        } catch (error) {
            console.error(error);
            res.status(500).send('Upps.. algo fallo')
        }
    },

    createSucursal: async (req, res) => {
        const { nombre, direccion } = req.body;
        try {
            await sucursal.create({ sc_nombre: nombre, sc_direccion: direccion, sc_estado: 1 });
            res.redirect('/sucursales')
        } catch (error) {
            console.error(error);
            res.status(500).send('server error');
        }
    },

    updateSucursalForm: async (req, res) => {

        const { id } = req.params;

        try {
            const sucursaless = await sucursal.findByPk(id);
            if (!sucursaless) return res.status(404).send('Sucursal no encontrada');

            res.json(sucursaless);

        } catch (error) {
            console.error(error);
            res.status(500).send('Upps.. algo fallo')
        }
    },

    updateSucursal: async (req, res) => {

        const { up_id, up_nombre, up_direccion } = req.body;

        try {
            await sucursal.update({ sc_id : up_id, sc_nombre : up_nombre, sc_direccion : up_direccion },
                { where: { sc_id : up_id } }
            );
            res.redirect('/sucursales')
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },



    deleteSucur: async (req, res) => {
        const { id } = req.params;


        try {
            deleteColab = await sucursal.update({ sc_estado: 0 },
                { where: { sc_id: id } }
            );
            res.redirect('/sucursales')

        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },
};

module.exports = sucursalController;
