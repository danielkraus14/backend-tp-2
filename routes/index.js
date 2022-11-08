const express = require('express');
const routes = express.Router();
const { isAuth } = require('../middlewares');

// Import controllers
const { usersController } = require('../controllers');

// Routes

// Users
routes.post('/login', usersController.login);
routes.post('/register', usersController.register);
routes.post('/delete', isAuth , usersController.deleteUser);
routes.post('/update', isAuth , usersController.updateUser);

module.exports = routes;