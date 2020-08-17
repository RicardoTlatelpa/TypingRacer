const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


 const authenticateToken = async (req,res,next) => {
     //used to return req.user
    const token = req.header('auth-token');
    if(token) {
        try{
            const verified = jwt.verify(token, keys.TOKEN);            
           req.user = verified;
        }catch(err){            
            next();      
        }   
    }
    next();      
}

 const requireLogin = (req,res,next) => {    
    authenticateToken();
    if(!req.user) {        
        return res.status(401).send({error: 'You must log in'});
    }
    next();
}

module.exports = authenticateToken;