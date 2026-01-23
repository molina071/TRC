const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./config/Conexion');
const session = require('express-session');

//importacion de controladores.
const loginController = require('./controllers/loginController');
const colaboradorController = require('./controllers/colaboradorController');
const sucursalController = require('./controllers/sucursalController');

//const userController = require('./controlador/usuarioControlador');
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

//set up view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


//routes//
//index
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/dashboardAdmin', (req, res) => {
    res.render('dashboardAdmin');
});


//RUTAS TEMPORALES POR QUE NECESITO HACER CRUD DE COLABORADORES Y DE SUCURSALES
app.get('/colaboradores', colaboradorController.getAllColab);
app.post('/colaboradores/create', colaboradorController.createColab);
app.get('/colaboradores/update/:id', colaboradorController.updateColabForm);
app.post('/colaboradores/update', colaboradorController.updateColab);
app.post('/colaboradores/delete/:id', colaboradorController.deleteColab);

app.get('/viajes', (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/login'); // si no hay sesión, redirige al login
    }
    res.render('dashboard', { usuario: req.session.usuario });
});


app.get('/reportes', (req, res) => {
    res.render('reportes');
});


app.post('/user/login', loginController.login);
/*// Create an user
app.get('/user/create', userController.createUsersForm);
app.post('/user/create', userController.createUsers);
// Update an user
app.get('/user/update/:id', userController.updateUsersForm);
app.post('/user/update/:id', userController.updateUsers);
// Delete an usuario
app.post('/user/delete/:id', userController.deleteUser);*/

// Start server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});