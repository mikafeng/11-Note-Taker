const express = require('express');
const fs = require('fs');
const api = require('./routes/index.js');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(`${__dirname}`, '/public/index.html')
);

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}`, '/public/notes.html')
})
app.use('/', api);

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT} `)
    );
