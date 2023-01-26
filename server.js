const express = require('express');
const app = express();
const PORT = process.env.PORT|| 3001;
const fs = require('fs'); 
const path = require('path');
const notesJSON = require('./db/notes.json');
// const {
//     readFromFile,
//     readAndAppend,
//     writeToFile,
//   } = require('./helpers/fsUtils');
  const api = require('./routes/index.js');
const notes = require('./routes/notesRoute.js');


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




//route returning any other page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})


// DELETE route for deleting a note
app.delete('/api/notes/:id', (req, res) => {
    let selectedId = req.params.id;
    // console.log(selectedId);
    fs.readFile(path.join(__dirname, './db/notes.json'),'utf-8', (err, notes) =>{
        // console.log(notes);
        if(err){
            return console.log(err);
        }
        let notesArray = JSON.parse(notes);

        for(let i=0; i<notesArray.length; i++){
            if(selectedId == notesArray[i].note_id){
                notesArray.splice(i,1);

                fs.writeFile(path.join(__dirname, './db/notes.json'), JSON.stringify(notesArray), (err, data) => {
                    if (err){
                        return err;
                    }
                    console.log(notesArray);
                    res.json(notesArray);
                })
            }
        }
        
    })
    
  
})



app.listen(PORT, () => {
    console.log(`Application is running and listening at ${PORT}`);
})