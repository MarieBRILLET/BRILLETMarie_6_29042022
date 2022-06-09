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
    let sauceObj = Sauces.findOne({ _id: req.params.id }).catch((err) => res.status(500).json({ error: err }));

    //si la sauce n'existe pas
    if (sauceObj === null) {
      res.status(404).json({ error: 'Aucune sauce a été trouvée' });
    }

    //fonction pour supprimer l'image uploadée par son nom de fichier
    function deleteImage(url) {
      fs.unlink(`images/${url}`, (err) => {
        if (err) {
          console.log('echec de la suppression image:' + err);
        } else {
          console.log('réussite de la suppression image');
        }
      });
    }
  
    //fonction pour update la base de données
    function updateDB() {
        Sauces.updateOne({ _id: req.params.id }, { ...sauceObj })
          .then(() => res.status(200).json({ message: 'La sauce a été mise à jour' }))
          .catch((err) => res.status(500).json({ error: err }));
      }

    //si l'objet existe
    if (req.file) {
      //controle de l'userId de la demande
      if (JSON.parse(req.body.sauce).userId != sauceObj.userId) {
        //si l'userId de la demande est différent de l'userId de l'objet
        deleteImage(req.file.filename);
        res.status(401).json({ error: 'Action non autorisée' });
      } else {
        //si correct, on supprime et on upload la nouvelle image
        const lastPartUrl = sauceObj.imageUrl.split('/').pop();
        deleteImage(lastPartUrl);
  
        sauceObj = {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/${req.file.path}`,
        };
  
        updateDB();
      }
    } else {
      if (sauceObj.userId != req.body.userId) {
        res.status(401).json({ error: 'Action non autorisée' });
      } else {
        sauceObj = { ...req.body };
        updateDB();
      }
    }
}
exports.deleteSauceId = (req, res, next) => {
    const sauceObj = Sauces.findOne({ _id: req.params.id }).catch((error) => res.status(500).json({ error }));

    //si la sauce n'existe pas
    if (sauceObj === null) {
        res.status(404).json({ error: 'Aucune sauce a été trouvée' });
    }

    if (req.file) {
        //controle de l'userId de la demande
        if (JSON.parse(req.body.sauce).userId != sauceObj.userId) {
            //si l'userId de la demande est différent de l'userId de l'objet
            res.status(401).json({ error: 'Action non autorisée' });
        } else {
            //si correct, on supprime et on upload la nouvelle image
            const lastPartUrl = sauceObj.imageUrl.split('/').pop();
            fs.unlink(`images/${lastPartUrl}`, (err) => {
                if (err) {
                    console.log('echec de la suppression image:' + err);
                } else {
                    console.log('réussite de la suppression image');
                }
            });
            Sauces.deleteOne({ _id: req.params.id }).catch((err) => res.status(500).json({ error: err }));

            return res.status(204).json({ message: 'La sauce a été supprimée' });
        }
    }
}