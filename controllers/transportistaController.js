const express = require('express');
const router = express.Router();
const app = express();
const transportista = require('../models/transportistasModel');

const transportistaController = {

    getAllTransportistas: async (req, res) => {
        try {
            const transportistass = await transportista.findAll({
                where: { tr_estado: 1 }
            });
            res.render('transportistas', { transportistass });

        } catch (error) {
            console.error(error);
            res.status(500).send('Upps.. algo fallo')
        }
    },

    createTransportista: async (req, res) => {
        const { nombre, tarifa } = req.body;
        try {
            await transportista.create({ tr_nombre: nombre, tr_tarifa: tarifa, tr_estado: 1 });
            res.redirect('/transportistas')
        } catch (error) {
            console.error(error);
            res.status(500).send('server error');
        }
    },


    updateTransportistaForm: async (req, res) => {

        const { id } = req.params;

        try {
            const transportistass = await transportista.findByPk(id);
            if (!transportistass) return res.status(404).send('Transportista no encontrado');

            res.json(transportistass);

        } catch (error) {
            console.error(error);
            res.status(500).send('Upps.. algo fallo')
        }
    },

    updateTransportista: async (req, res) => {

        const { up_id, up_nombre, up_tarifa } = req.body;
        try {
            await transportista.update({ tr_id: up_id, tr_nombre: up_nombre, tr_tarifa: up_tarifa },
                { where: { tr_id: up_id } }
            );
            res.redirect('/transportistas')
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },


    deleteTransport: async (req, res) => {
        const { id } = req.params;

        try {
            deleteTransport = await transportista.update({ tr_estado: 0 },
                { where: { tr_id: id } }
            );
            res.redirect('/transportistas')

        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },
};

module.exports = transportistaController;
