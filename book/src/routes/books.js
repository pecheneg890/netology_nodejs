
const express = require('express');
const { stor, Book } = require('../storage');
const router = express.Router();
const { multer, BOOK_FOLDER } = require('../middleware/file');
const path = require('node:path');
const axios = require('axios');
const COUNTER_URL = process.env.COUNTER_URL;

router.get('/', (req, res) => {
    const { books } = stor;
    res.render('books/index', { title: 'Список книг', books });
});

router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Добавление книги',
        book: new Book()
    });
});

router.post('/create', multer.single('book'),
    (req, res) => {
        const { books } = stor;

        const { title,
            description,
            authors,
            favorite,
            fileCover } = req.body;

        let originalname = "";
        if (req.file?.originalname) {
            originalname = Buffer.from(req.file?.originalname, 'latin1').toString('utf8');
        }
        const filename = req.file?.filename || "";

        const newBook = new Book(title, description,
            authors,
            favorite,
            fileCover,
            originalname,
            filename);

        books.push(newBook);

        res.redirect('.');
    });

router.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const { books } = stor;
    const idx = books.findIndex(el => el.id === id);
    if (idx !== -1) {
        res.render('books/update', { title: 'Редактирование информации о книге', book: books[idx] });
    } else {
        res.status(404);
        res.json('Code: 404');
    }
});

router.post('/update/:id', multer.none(), (req, res) => {
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
        res.redirect('..');
    } else {
        res.status(404);
        res.json('Code: 404');
    }
});

router.get('/:id', async (req, res) => {
    const { books } = stor;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        //увеличение количества просмотров
        try {
            const counterData = await axios.post(`${COUNTER_URL}/counter/${id}/incr`);
        } catch (err) {
        }

        //информация о просмотрах
        let counter = 0;
        try {
            const counterData = await axios.get(`${COUNTER_URL}/counter/${id}`);
            if (counterData.status = 200) { counter = counterData.data.incr; }
        } catch (err) {
            console.log(err);
        }

        res.render('books/view', {
            title: 'Информация о книге',
            book: books[idx],
            counter: counter
        });
    } else {
        res.status(404);
        res.json('Code: 404');
    }


});


router.post('/delete/:id', (req, res) => {
    const { books } = stor;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect("..");
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