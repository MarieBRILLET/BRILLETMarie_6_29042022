//importer variables d'environement
const dotenv = require('dotenv');
const result = dotenv.config();

//importer mongoose
const mongoose = require('mongoose');
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}
);

module.exports = mongoose;