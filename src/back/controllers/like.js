//importation models fiche_user
const Sauces = require('../models/sauces');

exports.likeSaucesId = (req, res, next) => {
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