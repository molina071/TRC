const express = require('express');
const app = express();
const colaborador = require('../models/colaboradoresModel');
const sucursal1 = require('../models/sucursalesModel');
const suc_col = require('../models/suc_col_Model');
const sequelize = require('../config/Conexion');



const colaboradorController = {

    getAllColab: async (req, res) => {
        try {
            const colaboradores = await colaborador.findAll({
                where: { cl_estado: 1 }
            });
            const sucursales = await sucursal1.findAll();
            res.render('colaboradores', { colaboradores, sucursales, vista: null });
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

    updateColabForm: async (req, res) => {
        const { id } = req.params;

        try {
            const vista = await colaborador.findByPk(id);
            if (!vista) return res.status(404).send('Colaborador no encontrado');

            const results = await sequelize.query(
                `
                  SELECT suc.sc_nombre, suc.sc_id FROM sucursales AS suc
                  INNER JOIN colaborador_sucursal AS cs
                  ON suc.sc_id = cs.sc_id
                  INNER JOIN colaboradores AS col
                  ON col.cl_cedula = cs.cl_cedula
                  WHERE col.cl_cedula = ?`,
                { replacements: [id], type: sequelize.QueryTypes.SELECT }
            );

            res.json({vista, results});

        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    updateColab: async (req, res) => {
        const { up_cedula, up_sucursal, up_nombre, up_apellido, up_direccion, up_distancia } = req.body;
        //validaciones
        if (!up_sucursal) throw new Error('Debe seleccionar una sucursal');
        if (!Number.isInteger(+up_distancia) || +up_distancia < 1 || +up_distancia > 50) {
            throw new Error('La distancia debe ser entre 1 y 50');
        }

        const t = await sequelize.transaction();

        try {
            const updateColab = await colaborador.update(
                { cl_cedula: up_cedula, cl_nombre: up_nombre, cl_apellido: up_apellido, cl_direccion: up_direccion, cl_estado: 1 },
                { where: { cl_cedula: up_cedula }, transaction: t }
            );

            const suc = await sucursal1.findByPk(up_sucursal, { transaction: t });
            if (!suc) throw new Error('La sucursal no existe');

            // Insertar en la tabla intermedia con distancia
            /* await suc_col.update(
                 { cl_cedula: updateColab.cl_cedula, sc_id: up_sucursal, distancia: up_distancia },
                 { where: { cl_cedula: up_cedula }, transaction: t }
             );*/

            await suc_col.update(
                { sc_id: up_sucursal, distancia: up_distancia },
                { where: { cl_cedula: up_cedula, sc_id: up_sucursal }, transaction: t }
            );

            await t.commit();
            res.redirect('/colaboradores');

        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    },

    deleteColab: async (req, res) => {
        const { id } = req.params;


        try {
            deleteColab = await colaborador.update({ cl_estado: 0 },
                { where: { cl_cedula: id } }
            );
            res.redirect('/colaboradores')

        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },
};

module.exports = colaboradorController;
