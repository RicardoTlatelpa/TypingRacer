//put all the strategies 
const GoogleStrategy = require("passport-google-oauth20");
const localStrategy = require('passport-local').Strategy;

const keys = require('../../config/keys');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    //serialize and deserialize here
    passport.serializeUser((user,done) => {
        done(null,user.id)
    });
    passport.deserializeUser((id,done) => {
        User.findById(id).then(user => {
            done(null,user);
        })
    })
    passport.use(
        new GoogleStrategy({
            callbackURL: '/auth/google/redirect',
            clientID: keys.GOOGLE_CLIENT_ID,
            clientSecret: keys.GOOGLE_CLIENT_SECRET
        }, (accessToken, refreshToken, profile, done) => {        
            //passport callback with google code                
            User.findOne({$or: [{"local.email": profile._json.email}, {"google.email": profile._json.email}]}).then(existingUser => {
                if(existingUser) {
                    return done(null, existingUser);
                }
                else {
                    new User({                    
                        username: profile.displayName,                    
                        google: {
                            googleID: profile.id,
                            email: profile._json.email,          
                            name: profile.displayName               
                        }                                        
                    })
                    .save()
                    .then(user => done(null, user));
                }
            })        
        })
    )
    passport.use(
        new localStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },(req, email, password, done) => {
            User.findOne({"local.email": email }, (err,user) => {
                if(err) return done(err);
                if(!user) return done(null, false, req.flash('loginMessage', 'No user found'))
                bcrypt.compare(password, user.local.password, (err, result) => {
                    if(err) throw err;
                    if(result == true){
                        return done(null,user);
                    }else {
                        return done(null, false);
                    }
                })
            })       
        })
    )    
}

