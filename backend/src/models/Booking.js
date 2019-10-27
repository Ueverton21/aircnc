const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Booking = new Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot'
    },
});

module.exports = mongoose.model('Booking', Booking);