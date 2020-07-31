export const elements = {
     theDiv: document.getElementById('key'),
     input: document.querySelector('#userInput'),
     triggerBtn: document.querySelector('#startGame'),
     countDown:document.querySelector('#countdown'),
     globalTimer: document.querySelector('.time'),
     minute: document.querySelector('.minute'),
     second: document.querySelector('.second'),
     currentSpeedEl: document.querySelector('.typing-speed'),
     userLinks: document.querySelector('.user__links')
}

export const toggleHidden = (element) => {
    element.classList.toggle('hide');
}

export const toggleDisplay = (element) => {
    element.classList.toggle('no-block');
}

