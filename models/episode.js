const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    date: {

        type: Date,
        default: Date.now
    },
    anime: {
        type: Schema.Types.ObjectId,
        ref: 'Anime'
    },
});

module.exports = mongoose.model('Episode', EpisodeSchema);