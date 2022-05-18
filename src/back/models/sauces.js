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
    //Systeme de notation
    likes: {type: Number, defaut: 0},
    dislikes: {type: Number, defaut: 0},
    usersLiked: {type: [String]},//array de userId
    usersDisliked: {type: [String]}
});

//exportation module
module.exports = mongoose.model('sauces', Schema);