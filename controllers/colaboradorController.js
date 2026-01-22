const express = require('express');
const app = express();
const colaborador = require('../models/colaboradoresModel');
const sucursal1 = require('../models/sucursalesModel');
const suc_col = require('../models/suc_col_Model');
const sequelize = require('../config/Conexion');


const colaboradorController = {

    getAllColab: async (req, res) => {
        try {
            const colaboradores = await colaborador.findAll()
            const sucursales = await sucursal1.findAll()
            res.render('colaboradores', { colaboradores, sucursales });
        } catch (error) {
            console.error(error);
            res.status(500).send('Upps.. algo fallo')
        }
    },



    createColab: async (req, res) => {
        const { cedula, sucursal, nombre, apellido, direccion, distancia } = req.body;
        if (!sucursal) throw new Error('Debe seleccionar una sucursal');
        if (!Number.isInteger(+distancia) || +distancia < 1 || +distancia > 50) {
            throw new Error('La distancia debe ser entre 1 y 50');
        }

        const t = await sequelize.transaction();
        try {


            const col = await colaborador.findByPk(cedula, { transaction: t }); //validacion no necesaria
            let nuevoColab;
            if (!col) { //IF

                nuevoColab = await colaborador.create(
                    { cl_cedula: cedula, cl_nombre: nombre, cl_apellido: apellido, cl_direccion: direccion, cl_estado: 1 },
                    { transaction: t }
                );

                // Verificar que la sucursal exista
                const suc = await sucursal1.findByPk(sucursal, { transaction: t });
                if (!suc) throw new Error('La sucursal no existe');

                // Insertar en la tabla intermedia con distancia
                await suc_col.create(
                    { cl_cedula: nuevoColab.cl_cedula, sc_id: sucursal, distancia: distancia },
                    { transaction: t }
                );
                await t.commit();
                res.redirect('/colaboradores');

            } else { //ELSE
                // Verificar que la sucursal exista
                const suc = await sucursal1.findByPk(sucursal, { transaction: t });
                if (!suc) throw new Error('La sucursal no existe');

                // Insertar en la tabla intermedia con distancia
                await suc_col.create(
                    { cl_cedula: cedula, sc_id: sucursal, distancia: distancia },
                    { transaction: t }
                );
                await t.commit();
                res.redirect('/colaboradores');
            }

        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).send('server error');
        }
    },


    updateColab: async (req, res) => {
        const { id } = req.params;
        const { cedula, sucursal, nombre, apellido, direccion, distancia } = req.body;
        //validaciones
        if (!sucursal) throw new Error('Debe seleccionar una sucursal');
        if (!Number.isInteger(+distancia) || +distancia < 1 || +distancia > 50) {
            throw new Error('La distancia debe ser entre 1 y 50');
        }

        const t = await sequelize.transaction();

        try {
            await colaborador.update({ cedula, sucursal, nombre, apellido, direccion, distancia },
                { where: { id }, transaction: t } //invesrtigar mas a fondo esto
            );

            const suc = await sucursal1.findByPk(sucursal, { transaction: t });
            if (!suc) throw new Error('La sucursal no existe');

            // Insertar en la tabla intermedia con distancia
            await suc_col.update(
                { cl_cedula: nuevoColab.cl_cedula, sc_id: sucursal, distancia: distancia },
                { where: { id }, transaction: t }
            );
            await t.commit();
            res.redirect('/colaboradores');

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
