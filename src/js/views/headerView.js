import {elements} from './base';

export const headerView = (user) => {
    const logoutString = `
    <li class="user__link u-margin-b-small"><a href="/api/logout">Dashboard</a></li>
    <li class="user__link u-margin-b-small"><a href="/api/logout">Logout</a></li>
    `
    const loginString = `<li class="user__link u-margin-b-small"><a href="/register">Register</a></li>
    <li class="user__link u-margin-b-small"><a href="#">Sign in!</a></li>
    <li class="user__link u-margin-b-small"><a href="/auth/google">Sign in with Google</a></li>`
    if(user){
        elements.userLinks.textContent = "";
        elements.userLinks.insertAdjacentHTML('afterbegin', logoutString); 
    }else {
        elements.userLinks.textContent = "";
        elements.userLinks.insertAdjacentHTML('afterbegin', loginString); 
    }
}
