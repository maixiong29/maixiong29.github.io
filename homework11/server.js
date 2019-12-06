var express = require("express");
var path = require("path");
var app = express();
var fs = require("fs");
var PORT = process.env.PORT || 8080;
var notes;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'))

var savedNotes = fs.readFileSync("./db/db.json", "UTF-8");
if (savedNotes) {
    var oldNotes = JSON.parse(savedNotes);
    notes = oldNotes;
} else {
    notes = [];
}

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    console.log("Added New Note");
    notes.push(newNote);
    res.json(newNote);
    assignID();
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, 2), function (err) {
        if (err) 
            throw err
    });
});

app.delete("/api/notes/:id", function(req, res) {
    console.log(req);
    const targetNote = parseInt(req.body.id);
    notes.splice(targetNote, 1);
    for(let i = 0; i < notes.length; i++){
      notes[i].id = i;
    }
    let stringifiedNotes = JSON.stringify(notes);
    fs.writeFile("db/db.json", stringifiedNotes, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("Note deleted!");
    });
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

function assignID() {
    for (i = 0; i < notes.length; i ++) {
        notes[i].id = i;
    }
}

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});