const mongoose = require('mongoose')

const Schema =  mongoose.Schema

// Structure of Data
const employmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    employer: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Intern', 'Junior', 'Senior','Other']
    }

}, { timestamps: true })

//model creates collection in the database if not there already
module.exports = mongoose.model('EmployeeRecords',employmentSchema)