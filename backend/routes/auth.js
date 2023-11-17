const express = require('express')
const router = express.Router()

// Get all
router.all('/', (req, res, next) => {
    if (req.session && req.session.userId) {
      // User is authenticated, proceed to the next route handler
      next();
    } else {
      // User is not authenticated, send an "Unauthorized" response
      res.status(401).send('Unauthorized');// can create an unauthorized screen
    }
  })

module.exports = router 