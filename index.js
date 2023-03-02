const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Mail = require('./schemas/mail');
// port
const port = 8000;
//
const mongoDB = 'mongodb://127.0.0.1/contact'
mongoose.connect(mongoDB, {useNewUrlParser: true});

const db = mongoose.connection;

app.use(cors());

db.once('open', () => {
    console.log('Connected to database at ', db.host, ':', db.port);
})

db.once('error', (error) => {
    console.log(`Database error ${error}`)
});


app.use(express.urlencoded({ extended: false}));

//================================================================
app.get('/', (req, res) => {
    res.json({ message: 'My Database'});
});


app.post('/contact', async (req, res) => {
    console.log('REQUEST ==>>',  req.body)
    Mail.create({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })
    .then(contact => {
        console.log('New contact:  ', contact);
        res.json({ message: 'message received'})
    })
    .catch(err => {
        console.log('Error: ', err);
        res.json({ message: 'Error ocurred, please try again'})
    });
})

//================================================================

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})