//importation de express
const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({message: "Votre requête a bien été reçue"});
});


//exportation du fichier
module.exports = app;