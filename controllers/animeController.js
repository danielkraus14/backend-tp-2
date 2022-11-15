const Anime = require('../models/anime');
const {animeService} = require('../services');

const getAnimes = async (req, res) => {
    try{
        const animes = await Anime.find();
        res.status(200).send(animes);
    }
    catch(error){
        res.status(500).send({message: 'Something went wrong', error});
    }
};

const getAnimeById = async (req, res) => {
    const {animeId} = req.query;
    try{
        const result = await animeService.getAnimeById(animeId);
        res.status(200).send(result);
    }
    catch(error){
        res.status(500).send({message: 'Something went wrong', error});
    }
};

const getAnimeByCategory = async (req, res) => {
    const {categoryId} = req.query;
    try{
        const result = await animeService.getAnimeByCategory(categoryId);
        res.status(200).send(result);
    }
    catch(error){
        res.status(500).send({message: 'Something went wrong', error});
    }
};

const uploadAnime = async (req, res) => {
    const {title, description, image, categories} = req.body;
    try{
        const result = await animeService.uploadAnime(title, description, image, categories);
        res.status(201).send(result);
    }
    catch(error){
        res.status(500).send({message: 'Something went wrong', error});
    }
};

const setFavorite = async (req, res) => {

    const {animeId} = req.params;
    const {userId} = req.body;

    try{
        const result = await animeService.setFavorite(animeId, userId);
        res.status(200).send(result);
    }
    catch(error){
        res.status(500).send({message: 'Something went wrong', error});
    }
};

const deleteAnime = async (req, res) => {
    const {animeId} = req.params;
    try{
        const result = await animeService.deleteAnime(animeId);
        res.status(200).send(result);
    }
    catch(error){
        res.status(500).send({message: 'Something went wrong', error});
    }
};

const updateAnime = async (req, res) => {
    const {animeId} = req.params;
    const { title, description, image} = req.body;
    try{
        const result = await animeService.updateAnime(animeId, title, description, image);
        res.status(200).send(result);
    }
    catch(error){
        res.status(500).send({message: 'Something went wrong', error});
    }
};

module.exports = {
    getAnimes,
    getAnimeById,
    getAnimeByCategory,
    uploadAnime,
    setFavorite,
    deleteAnime,
    updateAnime
};
