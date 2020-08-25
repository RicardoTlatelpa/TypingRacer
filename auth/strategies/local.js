const User = require('../../models/User');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


module.exports = function(passport) {

passport.use(
    new localStrategy((email, password, done) => {
        User.findOne({"local.email": email }, (err,user) => {
            if(err) throw err;
            if(!user) throw err;
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




