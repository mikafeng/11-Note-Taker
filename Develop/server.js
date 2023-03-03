//dependencies
const express = require("express");
const fs = require("fs");
// const api = require("../routes/htmlRoute.js");
const database = require("./db/db.json")
//sets up express server and initial port
const app = express();
const PORT = process.env.PORT || 3001;


//middleware
//sets up the Express app to handle data parsing for POST and PUT requests
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//sets up the Express app to serve static files
app.use(express.static('public'));


//router
//points server to router files

app.get('*', (req, res) =>
    res.sendFile(`${__dirname}`, '/public/index.html')
);

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}`, '/public/notes.html')
})



// app.use('/', api);



app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT} `)
    );
