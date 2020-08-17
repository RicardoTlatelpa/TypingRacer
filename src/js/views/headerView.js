import {elements} from './base';
import {calculateAverageSpeed} from '../helpers/calculations';


export const handleUserRaces = (user) => {
    const averageSpeed = elements.averageRaces;
    const numOfR = elements.numOfRaces;
    if(!user){
        averageSpeed.innerHTML = "0";
        numOfR.innerHTML = "0"
    }else {
        if(!user.races){
            averageSpeed.innerHTML = "0";
            numOfR.innerHTML = "0"
        }else {
            const races = calculateAverageSpeed(user.races);
            averageSpeed.innerHTML = races;
            numOfR.innerHTML = user.races.length;
        }
    }
}
const handleUserHeaderName = (user) => {
    const header = elements.username;
    if(!user){
        header.innerHTML = "Welcome, Guest"
    }else {
        header.innerHTML = `Welcome, ${user.username}`
    }
}
export const headerView = (user) => {    
    const logoutString = `
    <li class="btn u-margin-b-small"><a href="/user/dashboard">Dashboard</a></li>
    <li id = "#logout" class="btn u-margin-b-small">Logout</li>
    `    
    if(user){
        elements.userLinks.textContent = "";
        elements.userLinks.insertAdjacentHTML('afterbegin', logoutString); 
        handleUserHeaderName(user);
        handleUserRaces(user);
    }else {        
        handleUserHeaderName(user);
        handleUserRaces(user);
    }
}




