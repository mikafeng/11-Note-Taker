//packages
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid');


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

    res.sendFile(path.join(__dirname, './db/db.json'))
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add new note`);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
      
            const newNote = req.body;
    
            newNote.id = uuid(),
            parsedData.push(newNote);
            fs.writeFile(`./db/db.json`, JSON.stringify(parsedData), (err, x) => {
                res.json(parsedData)
            }

            );
        };
     });
});


app.listen(PORT, () =>
console.log(`Application now listening at http://localhost:${PORT}`)
);