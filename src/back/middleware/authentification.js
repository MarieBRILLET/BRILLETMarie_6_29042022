//importation
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_KEY_SECRET;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretKey);
        const userIdDecodedToken = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userIdDecodedToken) {
            throw 'User ID non valide';
        } else {
            next();
        }
    }
    catch (error) {
        res.status(403).json({ error: 'Echec de l\'authentification !' });
    }
}