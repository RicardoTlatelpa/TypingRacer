const { elements } =  require('../views/base');
const red = '#CC0000';

//login form
export const validateEmailLogin = () => {
    if(checkIfEmpty(elements.loginEmail)) {return;}        
    else {return true;}
}
export const validatePasswordLogin = () => {
    if(checkIfEmpty(elements.loginPassword)) {return;}
    else {return true;}
}
//register form
export const validateUserName = (field) => {
    checkUsernameLength(field, 3, 15)
    checkIfEmpty(field);
}
export const validateEmail = (field) => {
    //promise, check if email is in use
}
export const validatePassword = (field) => {
    //no spaces
    //valid length
}
export const validateConfirmPassword = (field, password) => {
    //compare passwords if equal
}

const checkIfEmpty = (field) => {
    if(isEmpty(field.value.trim())) {
        setInvalid(field, `${field.name} is wrong or invalid`);
        return true;
    }else {
        setValid(field);
        return false;
    }
}

const isEmpty = (value) => {
    if(value === '') {
        return true;
    }
    return false;
}

const setInvalid = (field, message) => {
    //set the field to a red color    
    field.nextElementSibling.innerHTML = message;    
    field.nextElementSibling.style.color = red;
    
}
const setValid = (field) => {
    field.nextElementSibling.innerHTML = '';
}

const validPasswordLength = (field, min, max) => {
    if(field.value.length > max )  {
        setInvalid(field, `${field.name} is too long`);
        return false;
    }else if(field.value.length < min){
        setInvalid(field, `${field.name} is too short`);
        return false;
    }
    else {
        setValid(field);
        return true;        
    }
}

const checkUsernameLength = (field, min, max) => {
    if(field.value.length > max )  {
        setInvalid(field, `${field.name} is too long`);
        return false;
    }else if(field.value.length < min){
        setInvalid(field, `${field.name} is too short`);
        return false;
    }
    else {
        setValid(field);
        return true;        
    }
}