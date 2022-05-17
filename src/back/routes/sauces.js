//importation
const express = require('express');

//importation controller
const saucesController = require('../controllers/sauces');

//importation middleware
const authentification = require('../middleware/authentification');

//fonction router()
const router = express.Router();

//route (endpoint)
router.post('/', authentification, saucesController.createSauces);

router.get('/', authentification, saucesController.readSauces);

router.get('/:id', authentification, saucesController.readSaucesId);

router.put('/:id', authentification, saucesController.updateSaucesId);

router.delete('/:id', authentification, saucesController.deleteSaucesId);

//exportation module
module.exports = router;