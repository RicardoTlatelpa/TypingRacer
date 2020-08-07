const red = '#CC0000';
export const checkIfEmpty = (field) => {
    if(isEmpty(field.value.trim())) {
        setInvalid(field, `${field.name} is wrong or invalid`);
        return true;
    }else {
        setValid(field);
        return false;
    }
}

export const validPasswordLength = (field, min, max) => {
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
export const validateUserName = (field) => {
    console.log(field);
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
    //set the next sibling span to say the message
}
const setValid = (field) => {
    //set the field to a red color    
    field.nextElementSibling.innerHTML = '';
    // field.nextElementSibling.style.color = red;
    //set the next sibling span to say the message
}