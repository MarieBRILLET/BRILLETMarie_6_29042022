//importation mongoose
const mongoose = require('mongoose');

//importation mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

//modèle de données pour les nouveaux utilisateurs (signup)
const userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
});

//sécurité pour ne pas enregister des emails déjà existants
userSchema.plugin(uniqueValidator);

//exportation module
module.exports = mongoose.model('user', userSchema);