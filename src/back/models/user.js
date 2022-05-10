//importation monogoose
const mongoose = require('mongoose');

//modèle de données pour les nouveaux utilisateurs (signup)
const userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
});
//exportation module
module.exports = mongoose.model('user', userSchema);