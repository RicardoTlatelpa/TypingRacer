export const elements = {
     username: document.querySelector('#username'),
     theDiv: document.getElementById('key'),     
     triggerBtn: document.querySelector('#startGame'),
     countDown:document.querySelector('#countdownNum'),
     globalTimer: document.querySelector('.time'),
     minute: document.querySelector('.minute'),
     second: document.querySelector('.second'),
     currentSpeedEl: document.querySelector('.typing-speed'),
     userLinks: document.querySelector('.user__links'),
     averageRaces: document.querySelector('.races'),
     numOfRaces: document.querySelector('.numOfRaces'),
     subRegister: document.querySelector('#sub-register'),
     existingAccount: document.querySelector('.existing-account'),
     activateSwitch: document.querySelector('.activate-switch'),
     subRegistrationForm: document.querySelector('.registrationSubForm'),
     loginEmail: document.querySelector('#emailLogin'),
     loginPassword: document.querySelector('#passwordLogin'),
     loginForm: document.querySelector('#loginForm'),
     userButton: document.querySelector('#svg-t'),
     registerForm: document.querySelector('#registerForm'),
     usernameRegister: document.querySelector('#usernameRegister'),
     emailRegisterInput: document.querySelector('#emailRegister'),
     passwordRegisterInput: document.querySelector('#passwordRegister'),
     confirmPasswordRegisterInput: document.querySelector('#confirmPasswordRegister'),
     main_menu: document.querySelector('.main-menu'),
     practiceButton: document.querySelector('#practiceType'),
     gameInput: document.querySelector('#userInput'),
     gameSession: document.querySelector('.game'),
     gameContainer: document.querySelector('.game__container'),
     countDownComponent: document.querySelector('.countdown-backdrop')

}

export const toggleHidden = (element) => {
    element.classList.toggle('hide');
}

export const toggleDisplay = (element) => {
    element.classList.toggle('no-block');
}

