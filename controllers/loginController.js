const express = require('express');
const user = require('../models/userModel');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');


const loginController = {
  login: async (req, res) => {
    const { correo, contra } = req.body;

    try {
      // Buscar usuario en la base de datos
      const usuario = await user.findOne({ where: { us_correo: correo } });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Comparación directa (texto plano)
      if (usuario.password === contra) { //usare has cuando llegue a la opcion de ingresar usuarios.
        if (usuario.rl_id === 1) {
          req.session.usuario = usuario;
          return res.redirect('/dashboardAdmin'); // Redirigir a la página de administración   
        }
        return res.redirect('/dashboard');
      } else {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
    } catch (err) {
      console.error(err); // imprime el error real en consola
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }
};

module.exports = loginController;