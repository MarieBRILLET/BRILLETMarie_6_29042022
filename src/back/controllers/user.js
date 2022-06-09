//importation bcrypt pour le hashage du mot de passe
const bcrypt = require('bcrypt');
//importation crypto-js pour chiffrer l'email
const cryptojs = require('crypto-js');
//importation jsonwebtoken
const jwt = require('jsonwebtoken');
//importation dotenv
const dotenv = require('dotenv');
dotenv.config();
//importation models user
const User = require('../models/user');

//signup enregistrement d'un nouvel utilisateur dans la base de données
exports.signup = (req, res) => {
    //chiffrer email avant envoi
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    //hashage du mot de passe
    bcrypt
        .hash(req.body.password, 10)//salt = 10 (nombre de fois que le mot de passe sera hashé)
        .then(hash => {
            //information enregistrées dans MongoDB
            const user = new User({
                email: emailCryptoJs,
                password: hash
            });
            //envoie user dans base de données MongoDB
            user
                .save()
                .then(() => {
                    res.status(201).json({ message: 'Utilisateur créé et enregistré !' });
                })
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

//login authentification
exports.login = (req, res) => {
    //chiffrer email
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    //chercher l'utilisateur dans la base de données
    User.findOne({ email: emailCryptoJs })
        //si email de user n'est pas trouvé
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            //contrôle validité du password
            bcrypt.compare(req.body.password, user.password)
                .then((controlPassword) => {
                    //si password est incorrect
                    if (!controlPassword) {
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    //si password est correct
                    //envoie response serveur du userId et du token d'authentification
                    res.status(200).json({
                        //encodage userId pour création de nouveau objet (objet et userId seront liés)
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            `${process.env.JWT_KEY_SECRET}`,
                            {expiresIn: '30min'}//peut être modifié
                        ),
                    });
                })
                .catch((error) => res.status(500).json({error}));
        })
        .catch((error) => res.status(500).json({error}));
};