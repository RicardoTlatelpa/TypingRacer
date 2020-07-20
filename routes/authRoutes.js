const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

router.post('/login', (req,res) => {
    const username = req.body.username;
    const user = {name: username}
    const accessToken = jwt.sign(user, keys.ACCESS_TOKEN);
    res.json({accessToken: accessToken})
})

router.get('/logout', (req,res) => {
    //clear the cookies --- access to the session
    res.send('Logging out!');
})
//in auth/strategies/google passport object is attached with google credentials 
//this first route authenticates and scopes user authorized profile
router.get('/auth/google', passport.authenticate("google", {
    scope: ['profile']
}))
//recieves code back from google and triggers passport callback
//in google.js
router.get('/auth/google/redirect', passport.authenticate("google"), (req,res)=> {
    //access to logged in user with request object 
    res.redirect('/');
})


module.exports = router;