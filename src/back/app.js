//importation de express
const express = require('express');

//importation de mongoose
const mongoose = require('./db/db');
//création de l'application express
const app = express();

app.use((req, res) => {
    res.json({message: "Votre requête a bien été reçue"});
});


//exportation du fichier
module.exports = app;