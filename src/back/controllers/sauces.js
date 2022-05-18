//importation models fiche_user
const Sauces = require('../models/sauces');

//importation module fs de node.js pour accéder au fichier serveur
const fs = require('fs');

exports.createSauces = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.ficheSauce);
    const fiche_sauces = new Sauces({
        ...sauceObject, //éclater l'objet sauceObject
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
    //controle du userId de la demande
    Sauces.findOne({ _id: req.params.id })
        .then((objet) => {
            if (userIdParamsUrl === objet.userId) {
                if (req.file) {
                    Sauces.findOne({ _id: req.params.id })
                        .then((objet) => {
                            //récupérer nom image à supprimer de base de données
                            const filename = objet.imageUrl.split('/images')[1];
                            //supprimer nom image du serveur
                            fs.unlink(`images/${filename}`, (error) => {
                                if (error) {
                                    throw error;
                                };
                            });
                        })
                        .catch((error) => res.status(404).json({ error }));
                };
                //objet mise à jour dans base de données
                const sauceObject = req.file ?
                    {
                        ...JSON.parse(req.body.ficheSauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    } : {
                        ...JSON.parse(req.body.ficheSauce)
                    };
                //mise à jour base de données
                Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Fiche modifiée !' }))
                    .catch((error) => res.status(404).json({ error }));
            } else {
                throw "userId différent du userId de l'objet à modifier";
            }

        })
        .catch((error) => res.status(403).json({ error }));
}
exports.deleteSaucesId = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then((objet) => {
            userIdParamsUrl = req.originalUrl.split("=")[1];
            //controle du userId de la demande
            if (userIdParamsUrl === objet.userId) {
                //récupérer nom image à supprimer de base de données
                const filename = objet.imageUrl.split('/images')[1];
                //supprimer nom image du serveur
                fs.unlink(`images/${filename}`, () => {
                    Sauces.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Objet supprimé de la base de données' }))
                        .catch((error) => res.status(404).json({ error }));
                });
            } else {
                throw "userId différent du userId de l'objet à supprimer";
            }
        })
        .catch((error) => res.status(500).json({ error }));
}