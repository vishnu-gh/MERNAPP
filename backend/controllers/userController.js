// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = (req,res)=>{
    res.json({message:"user register"});
}

// @desc Authenticate a User
// @route POST /api/user/login
// @access Public
const loginUser = (req,res)=>{
    res.json({message:"user login"});
}

// @desc Get user data
// @route GET /api/users
// @access Public
const getMe = (req,res)=>{
    res.json({message:"user data display"});
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}