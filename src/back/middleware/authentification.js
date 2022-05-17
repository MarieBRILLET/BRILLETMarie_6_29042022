//importation
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//exportation fonction middleware
module.exports = (req, res, next) => {
    try{
        //récupérer token dans header
        const token = req.headers.authorization.split(" ")[1];
        //décoder token
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_SECRET}`);
        //récupérer userId token
        const userIdDecodedToken = decodedToken.userId;
        //comparer userId token et userId requête
        if(req.body.userId){
            //si userId token et userId requête sont identiques, autoriser
            if(req.body.userId === userIdDecodedToken){
                 next();
            }else{
                throw 'userId différent';
            }
        }else{
            throw 'Vous n\'avez pas les droits pour effectuer cette action !'
        }
        //passer next middleware
        next();
    }catch(error){
        res.status(401).json({
            message: 'Echec de l\'authentification !',
            error: error
        });
    }
};