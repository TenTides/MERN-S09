require('dotenv').config()
const session = require('express-session');
const express = require('express')
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose')
const photoRoutes = require('./routes/photos')
const userRoutes = require('./routes/users');
const verifyEmailRoutes = require('./routes/verifyEmail');

// Express App is started
const app = express() 
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' })) // attaches json to requests
// Session Declaration
app.use(session({
    secret: 'JBwFVv2W##24D1H!kv%e6%43uV%bY1#CN78S9L9uwP1@RH*HXQ',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ 
        mongoUrl: process.env.MONGO_URI
    })
}));
// Debugging Scripts Runs on every request, logging each request
app.use((req,res,next) =>{
    console.log(req.path,req.method)
    next()
})
// Login routes go here <-----
app.use('/profile/photos',photoRoutes)
app.use('/api/verify-email', verifyEmailRoutes);
app.use('/api/users', userRoutes);

app.get('/api/session', (req, res) => {
    const sessionData = {
        userId: req.session.userId,
    };
    res.json(sessionData);
});
// Connect to db
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



// FOR Frontend, run this on the file before sending it to the DB
// function convertToBase64(file){
//     return new Promise((resolve,reject) =>{
//         const fileReader = new FileReader()
//         fileReader.readAsDataURL(file);
//         fileReader.onload  = () => {
//             resolve(fileReader.result)
//         };
//         fileReader.onerror = (error) => {
//             reject(error)
//         }
//     })
// }