const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});


module.exports = mongoose.model('Mail', mailSchema);