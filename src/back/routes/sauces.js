//importation
const express = require('express');

//importation controller
const saucesController = require('../controllers/sauces');
const likeController = require('../controllers/like');

//importation middleware
const authentification = require('../middleware/authentification');
const multer = require('../middleware/multer');

//fonction router()
const router = express.Router();

//route (endpoint)
router.post('/', authentification, multer, saucesController.createSauces);

router.get('/', authentification, saucesController.readSauces);

router.get('/:id', authentification, saucesController.readSaucesId);

router.put('/:id', authentification, multer, saucesController.updateSaucesId);

router.delete('/:id', authentification, saucesController.deleteSaucesId);

router.post('/:id/like', authentification, likeController.likeSaucesId);

//exportation module
module.exports = router;