import axios from 'axios';

export const verifyUser = async() => {
    try {
    return await axios.get('http://localhost:3000/api/user', {withCredentials: true});     
    }catch(err){        
        return err;
    }   
}
export const headerRacers = async() => {
    const headerToken = localStorage.getItem('auth-token');
    try{
        if(headerToken){
            return await axios.get('http://localhost:3000/api/user/races', {
                headers : {
                    'auth-token': headerToken
                }
            })
        }
        return await axios.get('http://localhost:3000/api/user/races');
    }
    catch(err){
        console.log(err);
    }
}
export const login = async(data) => {
    return await axios.post('http://localhost:3000/login', data);
}
export const checkEmail = async(email) => {
    return await axios.get('http://localhost:3000/queryEmail', email)
}
export const logout = async() => {
    console.log('loggin out')
    return await axios.get('http://localhost:3000/api/logout');
}

