//dependencies
const express = require("express");
const fs = require("fs");
const path = require("path")
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
//GET routes pointing to home/landing page and notes page

app.get('*', (req, res) =>
    res.sendFile(`${__dirname}`, '/public/index.html')
);

app.get('/notes', (req, res) => {
    res.sendFile(`${__dirname}`, '/public/notes.html')
})


//POST route to post notes to notes page
app
    .route("/api/notes")
    .get((req, res) => {
        res.json(database);
    });
//POST


app.post("/api/notes", (req, res) => {
    console.log(database);
    console.log(req.body);
    database.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(database, null, 2), (err) =>
        err ? console.log(err) : console.log("File written successfully")
    );
    res.json(database);
});

//Routes
app.get("/", (req, res) => {
    res.json(database);
});

app.get("/api/notes", (req, res) => {
    res.json(`${__dirname}`, "../db/db.json");
});

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT} `)
    );
