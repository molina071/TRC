const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./config/Conexion');
//importacion de controladores.
const loginController = require('./controllers/loginController');

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