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
router.post('/', authentification, multer, saucesController.createSauce);

router.get('/', authentification, saucesController.readSauce);

router.get('/:id', authentification, saucesController.readSauceId);

router.put('/:id', authentification, multer, saucesController.updateSauceId);

router.delete('/:id', authentification, saucesController.deleteSauceId);

router.post('/:id/like', authentification, likeController.likeSauceId);

//exportation module
module.exports = router;