const { response } = require("express");

const checkIfLogged = (req,res, next) => {
    if(req.user){
        return res.status(401).redirect('/');
    }    
    next();
}

module.exports = checkIfLogged;