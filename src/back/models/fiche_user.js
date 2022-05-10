//importation mongoose
const mongoose = require('mongoose');

//modèle donnée utilisateur pour front-end
const Schema = mongoose.Schema({
    userId: {type: String, required: true},
});

//exportation module
module.exports = mongoose.model('fiche_user', Schema);