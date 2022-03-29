const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc Fetch all users
// @route GET /api/users
// @access Public
const getAllUsers = asyncHandler(async (req, res)=>{
     const userCollection = await User.find();
    res.json({userCollection});
})

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req,res)=>{
   const {name,email,password} = req.body;
   if(!name || !email || !password){
       res.status(400);
       throw new Error('Please add required fields');
   }
   //check if user exist
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists!')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
   
    // Create user
    const user = await User.create({
        name,email,password:hashedPassword
    })

    if(user){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

    res.json({message:"user register"});
})

// @desc Authenticate a User
// @route POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (req,res)=>{
   const {email,password} = req.body;
   //Check for user email
   const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user credentials');
    } 
})

// @desc Get user data
// @route GET /api/users
// @access Private
const getMe = asyncHandler (async (req,res)=>{
    console.log(req.user);
    const {_id,name,email} = await User.findById(req.user.id);
    res.status(200).json({
        id:_id,
        name,
        email
    })
    
})


const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn:'30d'
    });
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    getAllUsers
}