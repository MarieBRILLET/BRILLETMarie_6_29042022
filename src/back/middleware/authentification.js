//importation
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//exportation fonction middleware
module.exports = (req, res, next) => {
    try {
        //récupérer token dans header
        const token = req.headers.authorization.split(" ")[1];
        //décoder token
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_SECRET}`);
        //récupérer userId token déchifrer
        const userIdDecodedToken = decodedToken.userId;
        //récupération userId pour form-data 
        userIdParamsUrl = req.originalUrl.split("=")[1];

        //comparer userId token et userId requête
        if (req._body === true) {
            //controle par BODY RAW
            if (req.body.userId === userIdDecodedToken) {
                next();
            } else {
                throw "erreur identification userId";
            };
            //controle par form-data (multer) params url
        } else if (userIdParamsUrl === userIdDecodedToken) {
            next();
        } else {
            throw "erreur identification url params form-data";
        };
        //passer next middleware
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Echec de l\'authentification !',
            error: error
        });
    }
};