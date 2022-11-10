const Anime = require('../models/anime');

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

module.exports = {
    uploadAnime
}