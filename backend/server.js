const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const ejs = require('ejs');
const path = require('path')
const {errorHandler} = require('./middleware/errorMiddleware');
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const connectDB = require('./config/db');
connectDB();
const app = express();
app.set('view engine','ejs');
app.use('/static',express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin: '*'
}));
app.use('/api/goals',require('./routes/goalRoutes'));
app.use('/api/users',require('./routes/userRoutes'));
app.use('/oauth', require('./routes/oauthRoutes'));
app.use(errorHandler);
app.listen(SERVER_PORT, ()=>console.log(`Server running on port ${SERVER_PORT}`));
