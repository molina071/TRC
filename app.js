const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./config/Conexion');
const session = require('express-session');
const sucursal1 = require('./models/sucursalesModel');
const transportistas = require('./models/transportistasModel');

//importacion de controladores.

const loginController = require('./controllers/loginController');
const colaboradorController = require('./controllers/colaboradorController');
const sucursalController = require('./controllers/sucursalController');
const viajesController = require('./controllers/viajesController');
const reportesController = require('./controllers/reportesController');
const { where } = require('sequelize');

//const userController = require('./controlador/usuarioControlador');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: "f93j2k!@#9sd8fjsd8fjsd8fj",
    resave: false,
    saveUninitialized: false
}));

//set up view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

//RENDERIZANDO VISTAS


app.post('/user/login', loginController.login);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/dashboardAdmin', (req, res) => {
    res.render('dashboardAdmin');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/transportistas', async (req, res) => {
    res.render('transportistas');
})




//RUTAS TEMPORALES POR QUE NECESITO HACER CRUD DE COLABORADORES Y DE SUCURSALES
app.get('/colaboradores', colaboradorController.getAllColab);
app.post('/colaboradores/create', colaboradorController.createColab);
app.get('/colaboradores/update/:id', colaboradorController.updateColabForm);
app.post('/colaboradores/update', colaboradorController.updateColab);
app.post('/colaboradores/delete/:id', colaboradorController.deleteColab);


//RUTAS DE VIAJES
app.get('/viajes', async (req, res) => {
    if (req.session.usuario && req.session.usuario.rl_id == 1) {

        const sucursales = await sucursal1.findAll({
            where: {
                sc_estado: 1,
            }
        });
        const transportista = await transportistas.findAll({
            where: {
                tr_estado: 1,
            }
        });
        res.render('viajes', { usuario: req.session.usuario, sucursales, transportista });

    } else {
        res.status(403).send('Acceso denegado');

    }

});

app.get('/viajes/:id', viajesController.renderizarViajes);
app.get('/viajes/distancia/:cedula/:sucursal', viajesController.obtenerDistancia);
app.post('/viajes/create', viajesController.createViajes);


//RUTAS DE REPORTES 
app.get('/reportes', reportesController.getAllViajes);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});