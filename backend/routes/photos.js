const express = require('express')
const {
    createPhoto,
    getSinglePhoto,
    getPhotos,
    deletePhoto,
    updatePhoto,
    searchPhotos,
} = require('../controllers/photoController')


const router = express.Router()

// Get all
router.get('/', getPhotos)
// Get one
router.get('/:id',getSinglePhoto)
// Add
router.post('/', createPhoto)
// Delete
router.delete('/:id',deletePhoto)
// Update
router.patch('/:id', updatePhoto)
// Search
router.post('/search', searchPhotos)
// Delete

module.exports = router 