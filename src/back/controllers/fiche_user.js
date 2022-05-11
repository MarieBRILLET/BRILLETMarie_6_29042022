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
exports.getFiche_user = (req, res, next) => {
    Fiche_user.find()
        .then((fiche_user) => res.status(200).json(fiche_user))
        .catch((error) => res.status(404).json({ error }));
}