const { headerView } = require('../views/headerView');
const { elements, toggleDisplay } = require('../views/base');
const { validateEmailLogin, validatePasswordLogin } = require('./validation');
const { verifyUser, login, logout, headerRacers } = require('../helpers/promises');
const { clearToken } = require('../helpers/clientStorage');


window.onload = async () => {   
    try {
        let user = await verifyUser();   
        console.log(user);                   
        headerView(user.data);                    
    }catch(err){
        headerView(false);        
    }       
}

//handle logout
document.addEventListener('click', async(e) => {
    let element = e.target;
    if(element.id === "#logout"){        
        try {
            clearToken();
            await logout();                                
            location.reload();
        }catch(err){
            console.log(err);
        }        
    }
});


elements.subRegister.addEventListener('click', function(e){
    e.stopImmediatePropagation();    
    toggleDisplay(elements.existingAccount);    
    toggleDisplay(elements.subRegistrationForm);    
});

elements.userLinks.addEventListener('click', function(event){
    if(event.target.id === "activate-switch") {
        event.stopImmediatePropagation();
        toggleDisplay(elements.existingAccount);
        toggleDisplay(elements.subRegistrationForm);
    }
})

elements.userButton.addEventListener('click', (e) => {    
    toggleDisplay(elements.userLinks);
    e.stopImmediatePropagation();
})

//validation for login in inputs
elements.loginEmail.addEventListener('focusout', (e) => {
    validateEmailLogin();
})

elements.loginPassword.addEventListener('focusout', (e) => {
    validatePasswordLogin();
})

//register validation inputs
elements.usernameRegister.addEventListener('keypress', (e) => {
    if(e.target.keyCode ===32){
        return false;
    }
})
// elements.usernameRegister.addEventListener('focusout', (e) => {
//     if(checkIfEmpty(e.target)) return;

// })

// elements.emailRegisterInput.addEventListener('focusout', (e) => {
//     if(checkIfEmpty(e.target)) return;
// })

// elements.passwordRegisterInput.addEventListener('focusout', (e) => {
//     if(checkIfEmpty(e.target)) return;
// })

// elements.confirmPasswordRegisterInput.addEventListener('focusout', (e) => {
//     if(checkIfEmpty(e.target)) return;
// })

//form submissions asynchronous
elements.loginForm.addEventListener('submit', async (e) => {    
    e.preventDefault();
    if(validateEmailLogin() && validatePasswordLogin()){
        let data = {
            email: elements.loginEmail.value,
            password: elements.loginPassword.value
        }            
        let response = await login(data);      
        console.log(response);
        
    }
    
})

elements.registerForm.addEventListener('submit', (e) => {    
    e.preventDefault();
})

