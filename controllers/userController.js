const express = require('express');
const app = express();
const user = require('../models/userModel'); //ESTE USER CONTROLER DEBE DE SER EDITADO

const userController = {

    getAllUsers: async (req, res) => {
        try {
            const users = await user.findAll();
            res.render('index', { users });

        } catch (error) {
            console.error(error);
            res.status(500).send('Upps.. algo fallo') // AQUI CAMBIE EL ENUNCIADO
        }
    },

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
        const { id } = req.params; // la unica duda que tengo es saber como obtengo los datos 
        //del parametro (osea el id).
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

module.exports = userController;
