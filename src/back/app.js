//importation de express
const express = require('express');

//importation de mongoose
const mongoose = require('./db/db');

//importation des routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
//création de l'application express
const app = express();

//debug mongoose
mongoose.set('debug', true);

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


//la route pour l'authentification
app.use('/api/auth', userRoutes);

//la route pour les sauces
app.use('/api/sauces', saucesRoutes);

//exportation du fichier
module.exports = app;