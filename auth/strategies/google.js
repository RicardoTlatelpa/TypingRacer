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
        User.findOne({googleID: profile.id}).then(existingUser => {
            if(existingUser) {
                return done(null, existingUser);
            }
            else {
                new User({
                    googleID: profile.id,
                    username: profile.displayName
                })
                .save()
                .then(user => done(null, user));
            }
        })        
    })
)