const {headerView} = require('../views/headerView');

module.exports = window.onload = async () => {
    const response = await axios.get('/api/user');
    if(response.data) {
        headerView(true);
    }else {
        headerView(false);
    }
    
}