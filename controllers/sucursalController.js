const express = require('express');
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
            await sucursal.create({ sc_nombre : nombre, sc_direccion : direccion, sc_estado : 1 });
            res.redirect('/sucursales')
        } catch (error) {
            console.error(error);
            res.status(500).send('server error');
        }
    },

    updateSucursalForm: async (req, res) => {
       
    },

    updateUsers: async (req, res) => {
        const { id } = req.params;
        const { nombre, edad, genero, estado } = req.body;

        try {
            await user.update({ nombre, edad, genero, estado },
                { where: { id } }
            );
            res.redirect('/')
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    

    deleteUser: async (req, res) => {
        const { id } = req.params;

        try {
            await user.destroy({ where: { id } });
            res.redirect('/')
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },
};

module.exports = sucursalController;
