//packages
const fs = require('fs');
const express = require('express');
const path = require('path');

const noteData = require('./db/db.json');

//initialize express and port
const app = express();
const PORT = process.env.PORT || 3001;

//sets up Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));



//HTML ROUTES
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


// GET/notes return notes.html
// GET * return indexedDB.html

//API ROUTES
app.get('/api/notes', (req, res) => {
    res.json(noteData);
});

// GET /api/notes db.json
// POST /api/notes new note saved to db.json (request body), return new note
// npm package for unique ids
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './publi/index.html'))
});

app.listen(PORT, () =>
console.log(`Application now listening at http://localhost:${PORT}`)
);