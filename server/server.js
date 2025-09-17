require( 'dotenv' ).config()
const express = require( 'express' )
const cors = require( 'cors' )
const mongoose = require( 'mongoose' ) 
const surveyRoutes = require('./routes/surveyRoute')
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documentRoute');
const path = require('path');


// VARIABLE DECLARATION
const app = express()
const db = process.env.ATLAS_URI
const port = process.env.PORT || 5000


// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// ROUTES
app.use('/survey', surveyRoutes);
app.use('/api', authRoutes);
app.use('/api/documents', documentRoutes);


// DB CONNECTION 
mongoose.connect(db)
    .then(() => {
        console.log('Connected to MongoDB Atlas')
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB Atlas: ' + err)
    })





// START SERVER 
app.listen(port, () => {
    console.log('Server is running on port ' + port)
})