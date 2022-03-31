const express = require('express');
const axios = require('axios');
const { response } = require('express');
const github_client_id = process.env.GITHUB_CLIENT_ID;
const github_client_secret = process.env.GITHUB_CLIENT_SECRET;


const githubHandler = (req,res)=>{
    const requestToken = req.query.code;
    axios({
        method:"post",
        url:`https://github.com/login/oauth/access_token?client_id=${github_client_id}&client_secret=${github_client_secret}&code=${requestToken}`,
        headers:{
            accept:"application/json"
        }
    }).then((response) => {
        const accessToken = response.data.access_token;
        res.redirect(`/oauth/welcome?access_token=${accessToken}`);
    })
}

const welcomeHandler = async (req,res)=>{
    const token = req.query.access_token;  
    //console.log(token);
   
    axios.get('https://api.github.com/user', {
        headers: {                        
                  Authorization:'token '+ token
              }
    })
    .then((response)=>response.data)
    .then((response)=>res.send(response));  

}
module.exports = {
    githubHandler,
    welcomeHandler
}