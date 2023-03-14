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

//API ROUTES
app.get('/api/notes', (req, res) => {
    res.json(noteData);
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add new note`);

    // destructure for items in req.body
    const {title, text} = req.body;
    //if all properties are present
    if(title && text) {
        //variable for object that is saved
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in saving note')
    }
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