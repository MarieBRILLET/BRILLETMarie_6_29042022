//importation models fiche_user
const Sauces = require('../models/sauces');

exports.createSauces = (req, res, next) => {
    const fiche_sauces = new Sauces({
        userId: req.body.userId,
    });
    fiche_sauces.save()
        .then(() => res.status(201).json({
            message: 'Fiche créée !',
        }))
        .catch((error) => res.status(400).json({ error }));
}
exports.readSauces = (req, res, next) => {
    Sauces.find()
        .then((fiche_sauces) => res.status(200).json(fiche_sauces))
        .catch((error) => res.status(404).json({ error }));
}
exports.readSaucesId = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then((fiche_sauces) => res.status(200).json(fiche_sauces))
        .catch((error) => res.status(404).json({ error }));
}
exports.updateSaucesId = (req, res, next) => {
    Sauces.updateOne({ _id: req.params.id }, { $set: req.body })
        .then(() => res.status(200).json({ message: 'Fiche modifiée !' }))
        .catch((error) => res.status(400).json({ error }));
}
exports.deleteSaucesId = (req, res, next) => {
    Sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Fiche supprimée !' }))
        .catch((error) => res.status(400).json({ error }));
}