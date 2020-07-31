const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


 const authenticateToken = async (req,res,next) => {
    const token = req.header('auth-token');
    if(token) {
        try{
            const verified = jwt.verify(token, keys.TOKEN);
            req.user = verified;
        }catch(err){
            res.status(400).send('Invalid token');
        }   
    }
    
}

export const requireLogin = (req,res,next) => {
    authenticateToken();
    if(!req.user) {        
        return res.status(401).send({error: 'You must log in'});
    }
    next();
}