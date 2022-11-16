const express = require('express');
const routes = express.Router();

//Import Middleware
const { 
    isAuth,
    isAdmin
} = require('../middlewares');

// Import controllers
const { 
    usersController,
    animeController,
    episodeController,
    categoryController,
} = require('../controllers');

// Schema validation
const { userSchema } = require('../controllers/schemas');

// Routes

// Users
routes.get('/user/:userId', usersController.getUserById);
routes.post('/signup', userSchema, usersController.signUpUser);
routes.post('/signin', userSchema, usersController.signInUser);
routes.put('/update/:userId', isAuth , usersController.updateUser);
routes.delete('/delete/:userId', isAuth, isAdmin , usersController.deleteUser);

//Anime
routes.get('/animes', animeController.getAnimes);
routes.get('/animes/:animeId', animeController.getAnimeById);
routes.get('/animes/:categoryId', animeController.getAnimeByCategory);
routes.post('/animes/new', isAuth, isAdmin, animeController.uploadAnime);
routes.put('/animes/favorite/:animeId', animeController.setFavorite);
routes.put('/animes/:animeId', isAuth, isAdmin, animeController.updateAnime);
routes.delete('/animes/delete/:animeId', isAuth, isAdmin, animeController.deleteAnime);


//Category
routes.get('/categories', categoryController.getCategories);
routes.get('/categories/:categoryId', categoryController.getCategoryById);
routes.post('/categories/new', isAuth, isAdmin, categoryController.createCategory);
routes.put('/categories/:categoryId', isAuth, isAdmin, categoryController.updateCategory);
routes.delete('/categories/delete/:categoryId', isAuth, isAdmin, categoryController.deleteCategory);

//Episode

routes.get('/episodes/:animeId', episodeController.getEpisodesByAnime);
routes.get('/episodes/:episodeId', episodeController.getEpisodeById);
routes.post('/episodes/new/:animeId', isAuth, isAdmin, episodeController.uploadEpisode);
routes.put('/episodes/:episodeId', isAuth, isAdmin, episodeController.updateEpisode);
routes.delete('/episodes/delete/:episodeId', isAuth, isAdmin, episodeController.deleteEpisode);


module.exports = routes;