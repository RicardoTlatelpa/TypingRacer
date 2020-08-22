const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');
const requireLogin = require('../middleware/requirelogin');
const { registerValidation } = require('../services/validation');
const checkIfLogged = require('../middleware/loginCheck')
const bcrypt = require('bcryptjs');
const { exist } = require('joi');



router.get('/api/user', (req,res) => {
    res.send(req.user);
})

router.get('/api/user/races', requireLogin, (req,res) => {
    res.send('Only the most authenticated shall pass!');
})

router.post('/register', async (req,res, done) => {    
        const validation = await registerValidation(req.body);
        if(validation.error) {
            return res.status(400).send(validation.error.details[0].message);
        }else {
            //find if user email is being used already
            User.findOne(
                {$or: [
                    {"local.email": req.body.email},
                    {"google.email": req.body.email}
                ]})
                // either in the nested google object or local object
            .then(async(existisingUser) => {                
                if(existisingUser) {
                    //if found in the google object
                    if(!existisingUser.local.email){
                        //if so update the current user's local object
                        const salt = await bcrypt.genSalt(10);
                        const hashedPwd = await bcrypt.hash(req.body.password, salt);
                        User.update({_id: existisingUser._id}, {$set: {local: {
                            email: req.body.email,
                            password: hashedPwd
                        }}})
                    }                    
                    res.status(400).send('Email is already in use.');
                    return done(null, existisingUser);
                    
                }
                else {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPwd = await bcrypt.hash(req.body.password, salt);
                    const user = new User({
                        username: req.body.username,
                            local: {
                                email: req.body.email,
                                password: hashedPwd
                            }                                          
                        });
                    try{
                        const savedUser = await user.save();
                        res.send({user: user._id});                       
                    }
                    catch(error){
                        res.status(500).send(error);
                    }
                }
            })            
        }
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/fail'
}));
 
router.get('/api/logout', (req,res) => {
    //clear the cookies --- which gives access to the session    
    req.logOut(); 
    res.redirect('/');
});
//in auth/strategies/google passport object is attached with google credentials 
//this first route authenticates and scopes user authorized profile
router.get('/auth/google',checkIfLogged, passport.authenticate("google", {scope: ['profile', 'email'] }));
//recieves code back from google and triggers passport callback
//in google.js
router.get('/auth/google/redirect', passport.authenticate("google"), (req,res)=> {
    //access to logged in user with request object 
    res.redirect('/');
});


module.exports = router;
