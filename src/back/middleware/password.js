//importation password-validator
const passwordValidator = require('password-validator');

//création du schema 
const passwordSchema = new passwordValidator();

//schema du mot de passe
passwordSchema
.is().min(5)                                    // Minimum length 5
.is().max(30)                                   // Maximum length 30
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have 1 digits
.has().symbols()                                // Must have symbols
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['PassWord', 'Password123']); // Blacklist these values

//vérification du mot de passe
module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    } else {
        return res
        .status(400)
        .json({error: `Le mot de passe n'est pas bon ${passwordSchema.validate('req.body.password', {list: true})}`});
    }
};