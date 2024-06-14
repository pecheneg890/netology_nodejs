const multer = require('multer');


const BOOK_FOLDER = 'book_storage';
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, BOOK_FOLDER);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

module.exports = {multer: multer({storage}), BOOK_FOLDER};