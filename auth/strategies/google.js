const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../../config/keys');
const User = require('../../models/User');


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
        User.findOne({email: profile._json.email}).then(existingUser => {
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