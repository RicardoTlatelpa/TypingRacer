const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


const authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, keys.ACCESS_TOKEN, (err,user) => {
        if(err) return res.send(403);
        req.user = user;        
    })
}

const requireLogin = (req,res,next) => {
    authenticateToken()
    if(!req.user) {        
        return res.status(401).send({error: 'You must log in or your token is not valid!'});
    }
    next();
}