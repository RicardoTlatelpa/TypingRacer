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
    <li class="user__link u-margin-b-small"><a href="/user/dashboard">Dashboard</a></li>
    <li class="user__link u-margin-b-small"><a href="/api/logout">Logout</a></li>
    `
    const loginString = `<li class="user__link u-margin-b-small"><a href="user/register">Register</a></li>
    <li class="user__link u-margin-b-small"><a href="#">Sign in!</a></li>
    <li class="user__link u-margin-b-small"><a href="/auth/google">Sign in with Google</a></li>`
    if(user){
        elements.userLinks.textContent = "";
        elements.userLinks.insertAdjacentHTML('afterbegin', logoutString); 
        handleUserHeaderName(user);
        handleUserRaces(user);
    }else {
        elements.userLinks.textContent = "";
        elements.userLinks.insertAdjacentHTML('afterbegin', loginString); 
        handleUserHeaderName(user);
        handleUserRaces(user);
    }
}

export const headerRegistrationView = () => {
    let html = `
    <div id = "registrationSubForm"> 
    <form id = "registerForm" class = "user__links__form u-margin-t-small">        
        <input class = "user__links__form__input u-margin-b-small" placeholder = "Username" type = "text">
        <br/>
        <input class = "user__links__form__input u-margin-b-small" placeholder="Email" type="email">
        <br/>
        <input class = "user__links__form__input u-margin-b-small" placeholder="Password" type="password">
        <br/>        
        <input class = "user__links__form__input u-margin-b-small" placeholder="Confirm Password" type="password">
        <br/>        
        <button class = "btn--default u-margin-b-medium">Register</button>        
    </form>
    <p id = "activate-switch" class = "user__link--switch"> Login instead</p>
    </div>
        `;
        elements.userLinks.insertAdjacentHTML('beforeend', html);
}
export const clearRegistrationView = () => {
    document.querySelector('#registrationSubForm').parentNode.removeChild(document.querySelector('#registrationSubForm'))
}
