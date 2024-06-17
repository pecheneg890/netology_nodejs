const multer = require('multer');


const BOOK_FOLDER = 'book_storage';
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, BOOK_FOLDER);
    },
    filename(req, file, cb) {
        const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')

        cb(null, `${Date.now()}-${originalname}`);
    }
});

module.exports = {multer: multer({storage}), BOOK_FOLDER};