const {headerView, headerRegistrationView, clearRegistrationView} = require('../views/headerView');
const { elements, toggleDisplay } = require('../views/base');

import axios from 'axios';

window.onload = async () => {
    const response = await axios.get('/api/user');
    if(response.data) {
        headerView(response.data);
    }else {
        headerView(false);
    }    
}
elements.subRegister.addEventListener('click', function(e){
    e.stopImmediatePropagation();    
    toggleDisplay(elements.existingAccount);
    headerRegistrationView();
});


elements.userLinks.addEventListener('click', function(event){
    if(event.target.id === "activate-switch") {
        event.stopImmediatePropagation();
        toggleDisplay(elements.existingAccount);
        clearRegistrationView();
    }
})

//validation