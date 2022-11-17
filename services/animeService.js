const Anime = require('../models/anime');
const User = require('../models/user');
const Category = require('../models/category');

const uploadAnime = async (title, description, image, categories) => {
    let result;
    try{
        const candidateAnime = new Anime(
            {
                title,
                description,
                image,
                categories
            }    
        )
        const categoriesArray = candidateAnime.categories;
        categoriesArray.map(categoryId => {
            try{
                Category.findById(categoryId).then(category => {
                    category.animes.push(candidateAnime._id);
                    category.save();
                })
            }catch(error){
                throw error;
            }
        });
        result = await candidateAnime.save();
        return result;
    }catch(error){ 
        throw error
    }
};

const getAnimeById = async (animeId) => {
    let result;
    try{
        const animeFound = await Anime.findById(animeId);
        if(!animeFound){
            throw new Error('Anime not found');
        }
        result = animeFound;
        return result;
    }catch(error){
        throw error;
    }
};

const getAnimeByCategory = async (categoryId) => {
    let result;
    try{
        const animeFound = await Anime.find({
            category: categoryId
        });
        if(!animeFound){
            throw new Error('There is no anime in this category');
        }
        result = animeFound;
        return result;
    }catch(error){
        throw error;
    }
};

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
        candidateUser.favoriteAnimes.includes(candidateAnime._id) 
            ?
            candidateUser.favoriteAnimes.pull(candidateAnime._id)
            :
            candidateUser.favoriteAnimes.push(candidateAnime._id);

        result = await candidateUser.save();
        return result;
    }catch(error){
        throw error;
    }
};


const updateAnime = async (animeId, title, description, image) => {
    let result;
    try{
        const candidateAnime = await Anime.findByIdAndUpdate(animeId, {title, description, image});
        if(!candidateAnime){
            throw new Error('Anime not found');
        }
        result = candidateAnime;
        return result;
    }catch(error){
        throw error;
    }
};
        
const deleteAnime = async (animeId) => {
    let result;
    try{
        const candidateAnime = await Anime.findById(animeId);
        if(!candidateAnime){
            throw new Error('Anime not found');
        }
        const categoriesArray = candidateAnime.categories;
        categoriesArray.map(categoryId => {
            try{
                Category.findById(categoryId).then(category => {
                    category.animes.pull(candidateAnime._id);
                    category.save();
                })
            }catch(error){
                throw error;
            }
        });
        result = await Anime.findByIdAndDelete(animeId);

        return result;
    }catch(error){
        throw error;
    }
};

module.exports = {
    uploadAnime,
    getAnimeById,
    getAnimeByCategory,
    setFavorite,
    deleteAnime,
    updateAnime
}