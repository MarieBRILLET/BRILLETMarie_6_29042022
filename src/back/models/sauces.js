//importation mongoose
const mongoose = require('mongoose');

const User = require('./user');

//modèle donnée sauce pour front-end
const Schema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    //Systeme de notation
    likes: {type: Number, defaut: 0},
    dislikes: {type: Number, defaut: 0},
    usersLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],//array de userId
    usersDisliked: [{ type: mongoose.Schema.Types.ObjectId, ref: User }]
});

//exportation module
module.exports = mongoose.model('sauces', Schema);