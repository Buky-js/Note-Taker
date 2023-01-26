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

// app.delete('/api/notes/:id', (req, res) => {
//     let selectedId = req.params.id; //Get the id through req.params.id of the object you are going to delete
//     let deleteObj = notesJSON.find(notesJSON => notesJSON.note_id == selectedId); // As you have only Id of the object, we want to get the entire object from the array. find() will fetch the object from the array whose id is equal to deleteId and assign it to deleteObj.
//     let deleteIndex = notesJSON.indexOf(deleteObj); //Find the index of the object fetched from the JSON array.
//     notesJSON.splice(deleteIndex,1); // Splice/ remove the object from the JSON Array.
//    res.send(deleteObj); // Send the deleted object as response.
// });

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