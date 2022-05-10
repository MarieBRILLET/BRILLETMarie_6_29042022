//importation bcrypt pour le hashage du mot de passe
const bcrypt = require('bcrypt');
//importation models user
const User = require('../models/user');

//signup enregistrement d'un nouvel utilisateur dans la base de données
exports.signup = (req, res, next) => {
    //hashage du mot de passe
    bcrypt
        .hash(req.body.password, 10)//salt = 10 (nombre de fois que le mot de passe sera hashé)
        .then(hash => {
            //information enregistrées dans MongoDB
            const user = new User({
                email: req.body.email,
                password: hash
            });
            //envoie user dans base de données MongoDB
            user
                .save()
                .then(() => {
                    res.status(201).json({ message: 'Utilisateur créé et enregistré !' });
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};