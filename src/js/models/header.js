const {headerView, headerRegistrationView, clearRegistrationView} = require('../views/headerView');
const { elements, toggleDisplay } = require('../views/base');
const { checkIfEmpty, validPasswordLength } = require('./validation');
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

//validation for input fields
elements.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
})
const validateEmailLogin = () => {
    if(checkIfEmpty(elements.loginEmail)) return;        
}

elements.loginEmail.addEventListener('focusout', (e) => {
    validateEmailLogin(e.target);
})

elements.loginPassword.addEventListener('focusout', (e) => {
    if(checkIfEmpty(elements.loginPassword)) return;
})