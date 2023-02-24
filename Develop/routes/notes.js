const express = require('express');
const app = express();

app.get('/api/notes', (req, res) => {
    res.json(`${__dirname}`, '/notes')
});


module.exports = app;