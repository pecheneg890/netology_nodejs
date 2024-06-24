const express = require('express')
const counterRoute = require('./routes/counter')

const app = express()
const port = 3000

app.use('/counter', counterRoute);

app.listen(port, () => {
    console.log(`Counter запущен на порту ${port}`)
})