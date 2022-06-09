//importer variables d'environement
const dotenv = require('dotenv');
dotenv.config();

//importer mongoose
const mongoose = require('mongoose');
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, 
    {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(error => console.log('Erreur de connexion à MongoDB : ' + error));

module.exports = mongoose;