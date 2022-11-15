const {episodeService} = require('../services');

const getEpisodesByAnime = async (req, res) => {
    try{
        const animeId = req.params.animeId;
        const episodes = await episodeService.getEpisodesByAnime(animeId);
        res.status(200).json(episodes);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

const getEpisodeById = async (req, res) => {
    try{
        const episodeId = req.params.episodeId;
        const episode = await episodeService.getEpisodeById(episodeId);
        res.status(200).json(episode);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

const uploadEpisode = async (req, res) => {
    try{
        const animeId = req.params.animeId;
        const episode = await episodeService.uploadEpisode(animeId, req.body);
        res.status(200).json(episode);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

const updateEpisode = async (req, res) => {
    try{
        const episodeId = req.params.episodeId;
        const episode = await episodeService.updateEpisode(episodeId, req.body);
        res.status(200).json(episode);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

const deleteEpisode = async (req, res) => {
    try{
        const episodeId = req.params.episodeId;
        const animeId = req.params.animeId;
        const episode = await episodeService.deleteEpisode(episodeId, animeId);
        res.status(200).json(episode);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};


module.exports = {
    getEpisodesByAnime,
    getEpisodeById,
    uploadEpisode,
    updateEpisode,
    deleteEpisode
};