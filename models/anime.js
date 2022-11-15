const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    episodes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Episode'
        }
    ]
});

module.exports = mongoose.model('Anime', AnimeSchema);