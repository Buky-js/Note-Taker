const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');
// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '/public/notes.html'));
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
})

// POST Route for adding a new note
notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4()
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`New note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
})


module.exports = notes;