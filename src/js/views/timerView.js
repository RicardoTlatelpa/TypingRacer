const {elements, toggleHidden} = require('./base');


const timerUI = () => {
    elements.countDown.textContent = "10";
    elements.input.focus();
    //startGame or whatever that means
    toggleHidden(elements.countDown);
}

const minuteHandlerUI = () => {
    let minus = elements.minute.textContent;
    minus--;
    if(parseInt(minus) === 0) {
        elements.minute.textContent = `0${0}`;
    }else {
        elements.minute.textContent = minus;
    }
}

const secondHandlerUI = (s) => {
    if(s === 60){
        s = `0${0}`;
    }
    else if (s < 10){
        s = `0${s}`;
    }
    elements.second.textContent = s;
}

export const updateRacerTimerUI = (s) => {
    let currentSeconds = parseInt(elements.second.textContent);
    let currentMinutes = parseInt(elements.minute.textContent);
    if(currentSeconds === 0) {
        minuteHandlerUI();
    }
    currentSeconds = 60 - s;
    secondHandlerUI(currentSeconds);
}