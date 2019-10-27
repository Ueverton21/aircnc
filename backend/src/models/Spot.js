const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Spot = new Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    },
});

Spot.virtual('thumbnail_url').get(function () {
    return `http://localhost:3333/files/${this.thumbnail}`;
});

module.exports = mongoose.model('Spot', Spot);