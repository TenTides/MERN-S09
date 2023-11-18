const photos = require('../models/photoModel')
const mongoose = require('mongoose')
// get ALL records
const getPhotos= async(req,res) =>
{
    const records = await photos.find({}).sort({createdAt: -1})
    res.status(200).json(records)
}
// get single record
const getSinglePhoto = async(req,res) =>
{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Photo For given ID'})
    }
    const record = await photos.findById(id)
    if(!record)
    {
        return res.status(404).json({error: 'No Such Photo For given ID'})
    }
    res.status(200).json(record)
}

// create new record
const createPhoto = async(req,res) =>
{
    const {file,tags} = req.body
    // add doc to db
    try {
        const newPhoto = await photos.create({file,tags})
        newPhoto.save()
        res.status(200).json(newPhoto)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a record
const deletePhoto = async(req,res) =>
{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Employee For given ID'})
    }
    const record = await photos.findOneAndDelete({_id: id})
    if(!record)
    {
        return res.status(400).json({error: 'No Such Employee For given ID'})
    }
    res.status(200).json(record)

}

const updatePhoto = async(req,res) =>
{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Employee For given ID'})
    }
    const record = await photos.findOneAndUpdate({_id: id},{...req.body})
    if(!record)
    {
        return res.status(400).json({error: 'No Such Employee For given ID'})
    }
    res.status(200).json(record)
}

// search records
const searchPhotos = async (req, res) => {
    const searchField = req.body.fieldName; // The field you want to search
    const searchValue = req.body.fieldValue; // The value to search for
    
    // Create a regular expression to perform a wildcard search
    const searchRegex = new RegExp(searchValue, 'i'); // 'i' for case-insensitive search
    
    if (searchField === 'tags') {
        searchValue = searchValue.split(',').map((tag) => tag.trim());
      }
      try {
        const query = {};
        if (searchField === 'tags') {
          query[searchField] = { $in: searchValue };
        } else {
          query[searchField] = searchRegex;
        }
    
        const records = await photos.find(query);
        if (records.length === 0) {
          return res.status(400).json({ error: 'No matching records found' });
        }
        res.status(200).json(records);
      } 
      catch (err) {
        return res.status(500).json({ error: 'An error occurred while searching records' });
      }
}



//--------------------------------------------------------------------------------------------SESSION VERSION


// const getPhotos= async(req,res) =>
// {
//     const records = await photos.find({userID: req.session.userID}).sort({createdAt: -1})
//     res.status(200).json(records)
// }
// // get single record
// const getSinglePhoto = async(req,res) =>
// {
//     const {id} = req.params
//     if(!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(req.session.userID)){
//         return res.status(404).json({error: 'No Such Photo For given ID'})
//     }
//     const record = await photos.findById(id)
//     if(!record)
//     {
//         return res.status(404).json({error: 'No Such Photo For given ID'})
//     }
//     res.status(200).json(record)
// }

// // create new record
// const createPhoto = async(req,res) =>
// {
//     const {file,tags,userID} = req.body
//     // add doc to db
//     try {
//         const newPhoto = await photos.create({file,tags,userID})
//         newPhoto.save()
//         res.status(200).json(newPhoto)
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// }

// // delete a record
// const deletePhoto = async(req,res) =>
// {
//     const {id} = req.params
//     if(!mongoose.Types.ObjectId.isValid(id)|| !mongoose.Types.ObjectId.isValid(req.session.userID)){
//         return res.status(404).json({error: 'No Such Employee For given ID'})
//     }
//     const record = await photos.findOneAndDelete({_id: id, userID: req.session.userID})
//     if(!record)
//     {
//         return res.status(400).json({error: 'No Such Employee For given ID'})
//     }
//     res.status(200).json(record)

// }

// const updatePhoto = async(req,res) =>
// {
//     const {id} = req.params
//     if(!mongoose.Types.ObjectId.isValid(id)|| !mongoose.Types.ObjectId.isValid(req.session.userID)){
//         return res.status(404).json({error: 'No Such Employee For given ID'})
//     }
//     const record = await photos.findOneAndUpdate({_id: id, userID: req.session.userID},{...req.body})
//     if(!record)
//     {
//         return res.status(400).json({error: 'No Such Employee For given ID'})
//     }
//     res.status(200).json(record)
// }

// // search records
// const searchPhotos = async (req, res) => {
//     const searchField = req.body.fieldName; // The field you want to search
//     const searchValue = req.body.fieldValue; // The value to search for
    
//     // Create a regular expression to perform a wildcard search
//     const searchRegex = new RegExp(searchValue, 'i'); // 'i' for case-insensitive search
    
//     if (searchField === 'tags') {
//         searchValue = searchValue.split(',').map((tag) => tag.trim());
//       }
//       try {
//         const query = { userID: req.session.userID };
//         if (searchField === 'tags') {
//           query[searchField] = { $in: searchValue };
//         } else {
//           query[searchField] = searchRegex;
//         }
    
//         const records = await photos.find(query);
//         if (records.length === 0) {
//           return res.status(400).json({ error: 'No matching records found' });
//         }
//         res.status(200).json(records);
//       } 
//       catch (err) {
//         return res.status(500).json({ error: 'An error occurred while searching records' });
//       }
// }

module.exports = {
    createPhoto,
    getPhotos,
    getSinglePhoto,
    deletePhoto,
    updatePhoto,
    searchPhotos
}