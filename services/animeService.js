const Anime = require('../models/anime');
const User = require('../models/user');

const uploadAnime = async (title, description, image) => {
    let result;
    try{
        const candidateAnime = new Anime(
            {
                title,
                description,
                image
            }    
        )
        result = await candidateAnime.save();
        return result;
    }catch(error){ 
        throw error
    }
}

const setFavorite = async (animeId, userId) => {
    let result;
    try{
        const candidateAnime = await Anime.findById(animeId);
        if(!candidateAnime){
            throw new Error('Anime not found');
        }
        const candidateUser = await User.findById(userId);
        if(!candidateUser){
            throw new Error('User not found');
        }
        candidateUser.favoriteAnimes.push(candidateAnime);
        result = await candidateUser.save();
        return result;
    }catch(error){
        throw error;
    }
};

const deleteAnime = async (animeId) => {
    let result;
    try{
        result = await Anime.findByIdAndDelete(animeId);
        return result;
    }catch(error){
        throw error;
    }
};

const getAnimeById = async (animeId) => {
    let result;
    try{
        result = await Anime.findById(animeId);
        return result;
    }catch(error){
        throw error;
    }
};

const updateAnime = async (animeId, title, description, image) => {
    let result;
    try{
        result = await Anime.findByIdAndUpdate(animeId, {title, description, image});
        return result;
    }catch(error){
        throw error;
    }
};


        

module.exports = {
    uploadAnime,
    setFavorite,
    deleteAnime,
    getAnimeById,
    updateAnime
}