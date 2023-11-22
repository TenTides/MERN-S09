const photos = require('../models/photoModel')
const mongoose = require('mongoose')
// get ALL records
const getPhotos= async(req,res) =>
{
    const records = await photos.find({userID: req.session.userId}).sort({createdAt: -1})
    res.status(200).json(records)
} 

// get single record
const getSinglePhoto = async(req,res) =>
{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(req.session.userID)){
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
    var {file,tags,userID} = req.body
    tags = tags.split(' ').map(tag => tag.trim());
    // add doc to db
    try {
        const newPhoto = await photos.create({file,tags,userID})
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
    const record = await photos.findOneAndDelete({_id: id, userID: req.session.userId})
    if(!record)
    {
        return res.status(400).json({error: 'No Such Employee For given ID2'})
    }
    res.status(200).json(record)
}

const updatePhoto = async (req, res) => {
    const { id } = req.params;
    const { tags } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No Such Employee For given ID1' });
    }
  
    try {
      const photo = await photos.findOne({ _id: id, userID: req.session.userId });
  
      if (!photo) {
        return res.status(400).json({ error: 'No Such Employee For given ID2' });
      }
  
      if (tags && tags.action === 'delete') {
        // Remove the tag at the specified index
        const tagIndex = tags.index;
        photo.tags.splice(tagIndex, 1);
      }
  
      // Update other fields as needed
  
      const updatedPhoto = await photo.save();
      res.status(200).json(updatedPhoto);
    } catch (error) {
      console.error('Error updating photo:', error.message);
      res.status(500).json({ error: 'An error occurred while updating the photo' });
    }
  };

// search records
const searchPhotos = async (req, res) => {
    const searchField = req.body.fieldName;
    let searchValue = req.body.fieldValue;

    console.log('Search Field:', searchField);
    console.log('Search Value:', searchValue);

    if (!searchValue) {
        try {
            const allRecords = await photos.find({ userID: req.session.userId }).sort({ createdAt: -1 });
            res.status(200).json(allRecords);
        } catch (err) {
            return res.status(500).json({ error: 'An error occurred while fetching all records' });
        }
        return;
    }

    // Create a regular expression to perform a wildcard search
    const searchRegex = new RegExp(searchValue, 'i'); // 'i' for case-insensitive search

    if (searchField === 'tags') {
        searchValue = searchValue.split(' ').map((tag) => tag.trim());
    }

    try {
        // Initial query object with userID condition
        const query = { userID: req.session.userId };

        // Extend the query object based on the search field
        if (searchValue && searchField === 'tags') {
            query[searchField] = { $in: searchValue };
        } else if (searchValue) {
            query[searchField] = searchRegex;
        }

        // Combine userID condition and search condition
        const records = await photos.find(query).sort({ createdAt: -1 });
        console.log(records.length);
        res.status(200).json(records);
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while searching records' });
    }
};

module.exports = {
    createPhoto,
    getPhotos,
    getSinglePhoto,
    deletePhoto,
    updatePhoto,
    searchPhotos
}