const mongoose = require('mongoose')

const Schema =  mongoose.Schema

// Structure of Data
const photoSchema = new Schema({
    file: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    // userID: { // When session is avalible 
    //     type: String,
    //     required: true
    // }
}, { timestamps: true })

//model creates collection in the database if not there already
module.exports = mongoose.model('idTest',photoSchema)