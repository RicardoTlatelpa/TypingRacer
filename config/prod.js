//production keys
module.exports = {
    //use process.env to match with deployed environment
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,        
    MONGO_CONNECT_URI: process.env.MONGO_CONNECT_URI
};