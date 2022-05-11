//importation models fiche_user
const Fiche_user = require('../models/fiche_user');

exports.createFiche_user = (req, res, next) => {
    const fiche_user = new Fiche_user({
        userId: req.body.userId,
    });
    fiche_user.save()
        .then(() => res.status(201).json({
            message: 'Fiche créée !',
        }))
        .catch((error) => res.status(400).json({ error }));
}