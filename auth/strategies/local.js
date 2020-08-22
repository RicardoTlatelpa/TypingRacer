const User = require('../../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


module.exports = function(passport) {        
passport.use('local',
    new LocalStrategy((email, password, done) => {
        User.find({"local.email": email, "google.email": email}, (err,user) => {
            if(err) throw err;
            if(!user) return done(null,false);
            bcrypt.compare(password, user.local.password, (err,result) => {
                if(err) throw err;
                if(result === true){
                    return done(null, user)
                }else {
                    return done(null, false);
                }
            })
        })
    })
)

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser((id,cb) => {
    User.findById(id, (err,user) => {
        cb(err,user)
    });
});

}
