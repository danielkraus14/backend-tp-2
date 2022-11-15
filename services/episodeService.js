const Episode = require('../models/episode');
const Anime = require('../models/anime');

const getEpisodes = async (animeId) => {
    let result;
    try{
        const animeFound = await Anime.findById(animeId);
        if(!animeFound){
            throw new Error('Anime not found');
        }
        result = animeFound.episodes;
        return result;
    }catch(error){
        throw error;
    }
};

const getEpisodeById = async (episodeId) => {
    let result;
    try{
        const episodeFound = await Episode.findById(episodeId);
        if(!episodeFound){
            throw new Error('Episode not found');
        }
        result = episodeFound;
        return result;
    }catch(error){
        throw error;
    }
};

const uploadEpisode = async (animeId, episode) => {
    let result;
    try{
        const animeFound = await Anime.findById(animeId);
        if(!animeFound){
            throw new Error('Anime not found');
        }
        const episodeCreated = await Episode.create(episode);
        animeFound.episodes.push(episodeCreated._id);
        await animeFound.save();
        result = episodeCreated;
        return result;
    }catch(error){
        throw error;
    }
};

const updateEpisode = async (episodeId, episode) => {
    let result;
    try{
        const episodeFound = await Episode.findById(episodeId);
        if(!episodeFound){
            throw new Error('Episode not found');
        }
        episodeFound.title = episode.title;
        episodeFound.description = episode.description;
        episodeFound.number = episode.number;
        await episodeFound.save();
        result = episodeFound;
        return result;
    }catch(error){
        throw error;
    }
};

const deleteEpisode = async (episodeId,animeId) => {
    let result;
    try{
        const episodeFound = await Episode.findById(episodeId);
        if(!episodeFound){
            throw new Error('Episode not found');
        }
        const animeFound = await Anime.findById(animeId);
        if(!animeFound){
            throw new Error('Anime not found');
        }
        animeFound.episodes.pull(episodeFound);
        await animeFound.save();
        await episodeFound.remove();
        result = episodeFound;
        return result;
    }catch(error){
        throw error;
    }
};


module.exports = {
    getEpisodes,
    getEpisodeById,
    uploadEpisode,
    updateEpisode,
    deleteEpisode
};