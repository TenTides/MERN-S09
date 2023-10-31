const express = require('express')
const {
    createRecord,
    getSingleRecord,
    getRecords,
    deleteRecord,
    updateRecord,
    searchRecords
} = require('../controllers/employeeController')


const router = express.Router()

// Get all
router.get('/', getRecords)
// Get one
router.get('/:id',getSingleRecord)
// Add
router.post('/', createRecord)
// Delete
router.delete('/:id',deleteRecord)
// Update
router.patch('/:id', updateRecord)
// Search
router.post('/search', searchRecords)
// Delete

module.exports = router 