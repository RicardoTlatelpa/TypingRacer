export const checkIfEmpty = (field) => {
    if(isEmpty(field.value.trim())) {
        setInvalid(field, `${field.name} must not be empty `);
        return true;
    }else {
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

    //set the next sibling span to say the message
    console.log(message);
}