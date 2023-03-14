//dependencies
const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require("path");
const uuid = require("uuid");

//sets up express server and initial port
const app = express();
const PORT = process.env.PORT || 3001;


//middleware
//sets up the Express app to handle data parsing for POST and PUT requests
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//sets up the Express app to serve static files
app.use(express.static('public'));

//ROUTES
app.get("/api/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.join(notes);
});

app.delete("/api/notes", (req, res) =>{
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const deleteNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
    res.json(deleteNote)
})  ;


//GET HOMEPAGE/NOTESPAGE
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//GET request for notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})



// //Post request, create a new id for new note
// app.post('/api/notes', (req, res) => {
//     fs.readFile(path.join(__dirname, "db.json"), "utf-8", function(error, response) {
//         if (error) {
//             console.log(error);
//         }
//         let notes = JSON.parse(response);
//         let noteRequest = req.body;
//         let newNoteID = uuid +1;
//         let newNote = {
//             id: newNoteID,
//             title: noteRequest.title,
//             text: noteRequest.text
//         };

//         notes.push(newNote);
//         res.json(newNote);
//         fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(notes, null, 2), function(err) {
//             if (err) throw err;
//             console.log('note saved!')
//         });

//     });

    // for (let i = 0; i < database.length; i++) {
    //     let note = database[i];

    //     if (note.id > highestId) {
    //         highestId = note.id;
    //     }
    // }

    // newNote.id = highestId + 1;
    // database.push(newNote);

    // fs.writeFile(jsonFilePath, JSON.stringify(database), (err) => {
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log("Note saved!");
    // });
    // res.json(newNote);
// });

// //DELETE request based on unique id number
// app.delete('/api/notes/:id', (req, res) => {
//     let jsonFilePath = path.join(__dirname, '/db/db.json');
//     for (let i = 0; i < database.length; i++) {
//         if (database[i].id == req.params.id) {
//             database.splice(i, 1);
//             break;
//         }
//     }

//     fs.writeFileSync(jsonFilePath, JSON.stringify(database), (err) => {
//         if (err) {
//             return console.log(err);
//         } else {
//             console.log('Note deleted!');
//         }
//     });
//     res.json(database);
// });



app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT} `)
    );
