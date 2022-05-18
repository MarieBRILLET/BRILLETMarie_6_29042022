//importation mongoose
const mongoose = require('mongoose');

//modèle donnée utilisateur pour front-end
const Schema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    //likes: {type: Number, required: true},
    //dislikes: {type: Number, required: true},
    //usersLiked: {type: Array, required: true},//array de userId
    //usersDisliked: {type: Array, required: true},
});

//exportation module
module.exports = mongoose.model('sauces', Schema);