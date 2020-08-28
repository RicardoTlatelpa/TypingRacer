const { elements, toggleDisplay } = require('../views/base');
const { timerUI } = require('../views/timerView');
const { updateRacerTimerUI } = require('../views/timerView');

let racerTimer;
const mainTimerHandler = (playerState) => {
    let startDate = Date.now();
    racerTimer = setInterval(() => {
        let m = parseInt(elements.minute.textContent);
        let s = parseInt(elements.second.textContent);
        let elapsedTime = Date.now() - startDate;
        let cSecond = ((elapsedTime / 1000) % 60).toFixed(0);
        if(m === 0 && s === 0) {
            //end game
            alert('You ran out of time!');
            clearMainTimer();
        }else {
            updateRacerTimerUI(cSecond);
            playerState.timeElapsed++;            
        }
    },1000);    
}

export function countdownBeforeGame(playerState){ 
    let seconds = document.querySelector('#countdownNum').innerHTML;    
    let countDownTimer = setInterval(function(){    
        seconds--;
        elements.countDown.textContent = seconds;
        if(seconds <= 0){              
            elements.gameInput.disabled = false;              
            toggleDisplay(elements.countDownComponent)    
            clearInterval(countDownTimer);                 
            mainTimerHandler(playerState);
        }
    }, 1000)
}

export const clearMainTimer = () => {
    clearInterval(racerTimer);
}