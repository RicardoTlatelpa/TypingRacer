const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const authToken = require('../middleware/requirelogin');
const { registerValidation, loginValidation } = require('../services/validation');
const checkIfLogged = require('../middleware/loginCheck');
const bcrypt = require('bcryptjs');


router.get('/api/user', authToken, (req,res) => {    
    res.send(req.user);
});

router.post('/register', async (req,res, done) => {    
        const validation = await registerValidation(req.body);
        if(validation.error) {
            return res.status(400).send(validation.error.details[0].message);
        }else {
            User.findOne({email: req.body.email}).then(async(existisingUser) => {
                if(existisingUser) {
                    res.status(400).send('Email is already in use.');
                    return done(null, existisingUser);
                }else {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPwd = await bcrypt.hash(req.body.password, salt);
                    const user = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: hashedPwd
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

router.post('/login', authToken, async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    
        const emailExist = User.findOne({email: email}).then(async(existing) => {
            if(existing){
                const validPass = await bcrypt.compare(password, existing.password);
                if(!validPass) {
                    return res.status(400).send('Username and password combination is wrong.');
                }else {
                    //store session/token
                    const token = jwt.sign({id: existing._id, username: existing.username}, keys.TOKEN, { expiresIn: '1h'});
                    //set the auth token header
                    res.header('auth-token', token).send(token);                    
                }
            }else {
                return res.status(400).send("Email or password is wrong");
            }
        })
})

router.get('/api/logout', (req,res) => {
    //clear the cookies --- which gives access to the session    
    req.logOut(); 
    res.redirect('/');
})
//in auth/strategies/google passport object is attached with google credentials 
//this first route authenticates and scopes user authorized profile
router.get('/auth/google', checkIfLogged,  passport.authenticate("google", {
    scope: ['profile']
}), (req,res) => {
    const token = req.header('auth-token');
    if(token) {
        delete req.headers('auth-token');
    }
})
//recieves code back from google and triggers passport callback
//in google.js
router.get('/auth/google/redirect',authToken, checkIfLogged, passport.authenticate("google"), (req,res)=> {
    //access to logged in user with request object 
    res.redirect('/');
})


module.exports = router;