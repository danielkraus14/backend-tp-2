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

const uploadAnime = async (req, res) => {
    const {title, description, image} = req.body;
    try{
        const result = await animeService.uploadAnime(title, description, image);
        res.status(201).send(result);
    }
    catch(error){
        res.status(500).send({message: 'Something went wrong', error});
    }
};

module.exports = {
    getAnimes,
    uploadAnime
}
