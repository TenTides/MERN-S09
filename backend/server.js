require('dotenv').config()
const session = require('express-session');
const express = require('express')
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')
const photoRoutes = require('./routes/photos')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users');

// Express App is started
const app = express() 
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' })) // attaches json to requests
// Session Declaration
app.use(session({
    secret: 'JBwFVv2W##24D1H!kv%e6%43uV%bY1#CN78S9L9uwP1@RH*HXQ', // <--- this key will have to removed later
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
// Debugging Scripts Runs on every request, logging each request
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' })) // attaches json to requests
app.use((req,res,next) =>{
    console.log(req.path,req.method)
    next()
})
// Login routes go here <-----
app.use('/profile',authRoutes) //middleware
app.use('/profile/photos',photoRoutes)
app.use('/api/verify-email', verifyEmailRoutes);
app.use('/api/users', userRoutes);

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