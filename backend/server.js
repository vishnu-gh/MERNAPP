const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api/goals',require('./routes/goalRoutes'));
app.use(errorHandler)
;app.listen(SERVER_PORT, ()=>console.log(`Server running on port ${SERVER_PORT}`));
