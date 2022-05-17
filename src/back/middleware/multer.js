//importation multer
const multer  = require('multer')

//dictoniaire MIME TYPES
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/png': 'png'
}

//repertoire et nom de fichier unique
const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'images');
    },
    filename : (req, file, callback) => {
        //supprimer espace dans nom de fichier
        const name = file.originalname.split(" ").join("-");
        const extension = MIME_TYPES[file.mimetype];

        callback(null, name + "_" + Date.now() + extension);
    }
})


//exportation middleware
module.exports = multer({storage}).single("image");