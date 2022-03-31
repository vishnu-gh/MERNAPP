const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req,res,next)=>{
let token;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
 try {
    token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    console.log(decoded);
    next();
 } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error('Not authorised')
 }} else{
     res.status(402);
     throw new Error('Not Authorised, no token')
 }
})

module.exports = {
 protect
}