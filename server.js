const express = require('express');
const app = express();
const PORT = process.env.PORT|| 3001;
// const fs = require('fs'); 
const path = require('path');

// const {
//     readFromFile,
//     readAndAppend,
//     writeToFile,
//   } = require('./helpers/fsUtils');
  const api = require('./routes/index.js');


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