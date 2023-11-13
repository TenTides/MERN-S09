require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const employeeRoutes = require('./routes/employees')
const signup = require('./routes/signup');
const verifyEmailRoutes = require('./routes/verifyEmail');
//Express App is started
const app = express() 

// Debugging Scripts Runs on every request, logging each request
app.use(express.json()) // attaches json to requests
app.use((req,res,next) =>{
    console.log(req.path,req.method)
    next()
})

//routes
app.use('/api/employees',employeeRoutes)
app.use('/api/signup', signup);
app.use('/api/verify-email', verifyEmailRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //Listen For requests on a given port
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB')
            console.log('Listening on port',process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
//get request handler for get on /
app.get('/', (req, res) => {
    res.json({msg: "Get req detected successfuly"})
})