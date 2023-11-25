require('dotenv').config()
const session = require('express-session');
const express = require('express')
const path = require('path')
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose')
const photoRoutes = require('./routes/photos')
const userRoutes = require('./routes/users');
const verifyEmailRoutes = require('./routes/verifyEmail');

// Express App is started
const app = express() 
app.use(cors());
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
if(process.env.NODE_ENV == "production")
{
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get('*',(req,res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

// app.use((req,res,next) =>{
//     console.log(req.path,req.method)
//     next()
// })
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

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ message: 'Logout successful' });
      }
    });
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
