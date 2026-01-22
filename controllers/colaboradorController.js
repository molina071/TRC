const express = require('express');
const app = express();
const colaborador = require('../models/colaboradoresModel');

const colaboradorController = {

    getAllColab: async (req, res) => {
        try {
            const colaboradores = await colaborador.findAll();      
            /*{
                include: [ //aqui añadi
                    {
                        model: sucursal,
                        attributes: ['sc_nombre'],
                    }
                ]
            });//hasta aqui*/
            res.render('colaboradores', { colaboradores,});
        } catch (error) {
            console.error(error);
            res.status(500).send('Upps.. algo fallo')
        }
    },

    //por aqui voy configurandolo
    createUsersForm: async (req, res) => {
        res.render('create');
    },

    createUsers: async (req, res) => {
        const { nombre, edad, genero, estado } = req.body;
        try {
            await user.create({ nombre, edad, genero, estado });
            res.redirect('/')
        } catch (error) {
            console.error(error);
            res.status(500).send('server error');
        }
    },

    updateUsersForm: async (req, res) => {
        const { id } = req.params;
        try {
            const userr = await user.findByPk(id);
            res.render('update', { userr });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
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

module.exports = colaboradorController;
