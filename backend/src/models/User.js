const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email: String
});

module.exports = mongoose.model('User', User);