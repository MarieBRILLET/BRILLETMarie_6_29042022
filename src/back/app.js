//importation de express
const express = require('express');

//importation de mongoose
const mongoose = require('./db/db');

//importation des routes
const userRoutes = require('./routes/user');

//création de l'application express
const app = express();

//gérer les problèmes de CORS (cross origin resource sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});
//transformer le body de la requête en json
app.use(express.json());

//route générale + middleware
//app.use((req, res) => {
//    res.json({message: "Votre requête a bien été reçue"});
//});

//la route pour l'authentification
app.use('/api/authentification', userRoutes);

//exportation du fichier
module.exports = app;