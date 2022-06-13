//importation models fiche_user
const Sauces = require('../models/sauces');

//importation module fs de node.js pour accéder au fichier serveur
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;

    const fiche_sauces = new Sauces({
        ...sauceObject, //éclater l'objet sauceObject
        imageUrl: imageUrl,
        likes: 0,
        dislikes: 0,
    });
    fiche_sauces.save()
        .then(() => res.status(201).json({ message: 'Fiche créée !' }))
        .catch((error) => res.status(400).json({ error }));
}
exports.readSauce = (req, res, next) => {
    Sauces.find()
        .then((fiche_sauces) => res.status(200).json(fiche_sauces))
        .catch((error) => res.status(404).json({ error }));
}
exports.readSauceId = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
        .then((fiche_sauces) => res.status(200).json(fiche_sauces))
        .catch((error) => res.status(404).json({ error }));
}
exports.updateSauceId = (req, res, next) => {
  //modification avec l'image
    if (req.file) {
      Sauces.findOne({ _id: req.params.id })
        .then((fiche_sauces) => {
          const filename = fiche_sauces.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, ( ) => {
            const sauceObject = {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            }
            Sauces.updateOne({ _id: req.params.id }, { $set: sauceObject })
              .then(() => res.status(200).json({ message: 'Fiche modifiée !' }))
              .catch((error) => res.status(400).json({ error }));
          }
          )
        }
        )
        .catch((error) => res.status(404).json({ error }));
    } else {
      //modification sans l'image
      const sauceObject = {...req.body};
      Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Fiche modifiée !' }))
        .catch((error) => res.status(400).json({ error }));
    }
}
exports.deleteSauceId = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((fiche_sauces) => {
      const filename = fiche_sauces.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, ( ) => {
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Fiche supprimée !' }))
          .catch((error) => res.status(400).json({ error }));
      })
    })
    .catch((error) => res.status(404).json({ error }));
}
exports.likeSauceId = (req, res, next) => {
  //find sauce dans base de données
  Sauces.findOne({ _id: req.params.id })
      .then((objet) => {
          switch (req.body.like) {
              case 1:
                  //like = 1 (likes = +1) 
                  if (!objet.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                      Sauces.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
                          .then(() => res.status(201).json({ message: 'Fiche Sauce Like +1' }))
                          .catch((error) => res.status(400).json({ error }));
                  }
                  break;
              case -1:
                  //like = -1 (dislikes = +1)
                  if (!objet.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                      Sauces.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
                          .then(() => res.status(201).json({ message: 'Fiche Sauce Dislike +1' }))
                          .catch((error) => res.status(400).json({ error }));
                  }
                  break;
              case 0:
                  //like = 0 (like = 0, neutre)
                  if (objet.usersLiked.includes(req.body.userId)) {
                      Sauces.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                          .then(() => res.status(201).json({ message: 'Fiche Sauce Like 0' }))
                          .catch((error) => res.status(400).json({ error }));
                  };
                  //like = 0 (dislikes = 0, neutre)
                  if (objet.usersDisliked.includes(req.body.userId)) {
                      Sauces.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                          .then(() => res.status(201).json({ message: 'Fiche Sauce Dislike 0' }))
                          .catch((error) => res.status(400).json({ error }));
                  }
                  break;
          }
      })
      .catch((error) => res.status(404).json({ error }));
}