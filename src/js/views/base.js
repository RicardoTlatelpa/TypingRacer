export const elements = {
     username: document.querySelector('#username'),
     theDiv: document.getElementById('key'),
     input: document.querySelector('#userInput'),
     triggerBtn: document.querySelector('#startGame'),
     countDown:document.querySelector('#countdown'),
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
     subRegistrationForm: document.querySelector('#registrationSubForm')
}

export const toggleHidden = (element) => {
    element.classList.toggle('hide');
}

export const toggleDisplay = (element) => {
    element.classList.toggle('no-block');
}

