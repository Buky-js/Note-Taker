const express = require('express');
const app = express();
const PORT = process.env.PORT|| 3001;
// const fs = require('fs'); 
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('./helpers/fsUtils');
  const api = require('./route/index.js');
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

//route returning home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

//route returning notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    // res.sendFile(path.join(__dirname, '/public/notes.html'));
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
})



//route returning any other page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.post('/api/notes', (req, res) => {
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

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    
    // readFromFile('./db/notes.json').then((data) => {
    //     let obj = JSON.parse(data);
    //     res.json(obj)});
    //     console.log(obj);
    // for(let i=0; i<obj.length; i++){
    //     if([i].note_id == id){

    //     }
    // }
})



app.listen(PORT, () => {
    console.log(`Application is running and listening at ${PORT}`);
})