const EmployeeRecords = require('../models/employmentModel')
const mongoose = require('mongoose')
// get ALL records
const getRecords = async(req,res) =>
{
    const records = await EmployeeRecords.find({}).sort({createdAt: -1})
    res.status(200).json(records)
}
// get single record
const getSingleRecord = async(req,res) =>
{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Employee For given ID'})
    }
    const record = await EmployeeRecords.findById(id)
    if(!record)
    {
        return res.status(404).json({error: 'No Such Employee For given ID'})
    }
    res.status(200).json(record)
}


// create new record
const createRecord = async(req,res) =>
{
    const {name,position,employer,type} = req.body
    // add doc to db
    try {
        const newEmployee = await EmployeeRecords.create({name,position,employer,type})
        res.status(200).json(newEmployee)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a record
const deleteRecord = async(req,res) =>
{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Employee For given ID'})
    }
    const record = await EmployeeRecords.findOneAndDelete({_id: id})
    if(!record)
    {
        return res.status(400).json({error: 'No Such Employee For given ID'})
    }
    res.status(200).json(record)

}

const updateRecord = async(req,res) =>
{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Employee For given ID'})
    }
    const record = await EmployeeRecords.findOneAndUpdate({_id: id},{...req.body})
    if(!record)
    {
        return res.status(400).json({error: 'No Such Employee For given ID'})
    }
    res.status(200).json(record)
}
// search records
const searchRecords = async (req, res) => {
    const searchField = req.body.fieldName; // The field you want to search
    const searchValue = req.body.fieldValue; // The value to search for
    
    // Create a regular expression to perform a wildcard search
    const searchRegex = new RegExp(searchValue, 'i'); // 'i' for case-insensitive search
    
    try {
        const records = await EmployeeRecords.find({ [searchField]: searchRegex });
        if (records.length === 0) {
            return res.status(400).json({ error: 'No matching records found' });
        }
        res.status(200).json(records);
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while searching records' });
    }
}


module.exports = {
    createRecord,
    getRecords,
    getSingleRecord,
    deleteRecord,
    updateRecord,
    searchRecords
}