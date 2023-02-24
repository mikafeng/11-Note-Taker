const app = require('express').Router();
const fs = require ('fs');
const notes = require('../db/db.json')


app.get('/notes', (req, res) => {
    res.json(notes)
});

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}`, '../public/notes.html')
})


module.exports = app;