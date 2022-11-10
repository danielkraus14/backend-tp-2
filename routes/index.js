const express = require('express');
const routes = express.Router();
const { isAuth } = require('../middlewares');

// Import controllers
const { 
    usersController,
    animeController,
    episodeController
} = require('../controllers');

// Schema validation
const { userSchema } = require('../controllers/schemas');

// Routes

// Users
routes.post('/login', usersController.signInUser);
routes.post('/register', userSchema, usersController.signUpUser);
routes.post('/delete', isAuth , usersController.deleteUser);
routes.post('/update', isAuth , usersController.updateUser);

//Anime
routes.get('/animes', animeController.getAnimes);
routes.post('/animes', animeController.uploadAnime);


module.exports = routes;