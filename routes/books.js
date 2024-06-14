
const express = require('express');
const { stor, Book } = require('../storage');
const router = express.Router();
const { multer, BOOK_FOLDER } = require('../middleware/file');
const path = require('node:path');

router.get('/', (req, res) => {
    const { books } = stor;
    res.json(books);
});

router.get('/:id', (req, res) => {
    const { books } = stor;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('Code: 404');
    }
});

router.post('/', multer.single('book'),
    (req, res) => {
        const { books } = stor;

        const { title,
            description,
            authors,
            favorite,
            fileCover,
            fileName } = JSON.parse(req.body.info);

        const newBook = new Book(title, description,
            authors,
            favorite,
            fileCover,
            fileName,
            req.file.filename);
        books.push(newBook);

        res.status(201);
        res.json(newBook);
    });

router.put('/:id', (req, res) => {
    const { books } = stor;
    const { title,
        description,
        authors,
        favorite,
        fileCover,
        fileName } = req.body;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        };
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('Code: 404');
    }
});

router.delete('/:id', (req, res) => {
    const { books } = stor;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json("ok");
    } else {
        res.status(404);
        res.json('Code: 404');
    }
});

router.get('/:id/download', (req, res) => {
    const { books } = stor;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.download(path.join(BOOK_FOLDER, books[idx].fileBook), books[idx].fileName);
    } else {
        res.status(404);
        res.json('Code: 404');
    }
});

module.exports = router;