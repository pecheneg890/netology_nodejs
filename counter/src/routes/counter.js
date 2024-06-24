const express = require('express')
const redis = require('redis');

const router = express.Router();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost';
const client = redis.createClient({url: REDIS_URL});

( async () =>{
    await client.connect();
})();

router.post('/:bookId/incr', async (req, res)=>{
    const {bookId} = req.params;
    const resp = {};
    resp.incr = await client.incr(bookId);
    res.status(201);
    res.json(resp);
})

router.get('/:bookId', async (req, res)=>{
    const resp = {};
    const {bookId} = req.params;
    resp.incr = await client.get(bookId) || 0;
    
    res.status(200);
    res.json(resp);
})

module.exports = router;