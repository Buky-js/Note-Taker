const express = require('express');
const app = express();
const port = process.nextTick.PORT || 3001;
const fs = require('fs'); 
const path = require('path');

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

//route returning notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

//app.get()

//route returning index page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})






app.listen(port, () => {
    console.log(`Application is running and listening at ${port}`);
})