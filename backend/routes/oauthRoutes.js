const express = require('express');
const router = express.Router();
const axios = require('axios');
var path = require('path');
const {githubHandler,welcomeHandler} = require('../controllers/oauthController')

router.get('/',(req,res)=>{
    res.render(path.resolve(__dirname+'/../views/index.ejs'));
})

router.get('/welcome',welcomeHandler);

router.get('/github/redirect', githubHandler);

router.get('/github/login', (req,res)=>{
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})


module.exports = router;