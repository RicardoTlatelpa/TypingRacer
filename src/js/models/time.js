const { elements, toggleDisplay } = require('../views/base');
const { timerUI } = require('../views/timerView');
const { updateRacerTimerUI } = require('../views/timerView');
const { calculateTypingSpeed } = require('../helpers/calculations');

let racerTimer;
const mainTimerHandler = (playerState, gameObject) => {
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
            //update the timer component
            updateRacerTimerUI(cSecond);
            //increment the seconds passed to the state
            playerState.timeElapsed++;            
            //for each elapsed second update the user WPM
            const currentSpeed = calculateTypingSpeed(playerState.currentLetters, playerState.timeElapsed)
            elements.currentWpm.innerHTML = currentSpeed;            
        }
    },1000);    
}

export function countdownBeforeGame(playerState, gameObject){ 
    let seconds = document.querySelector('#countdownNum').innerHTML;    
    let countDownTimer = setInterval(function(){    
        seconds--;
        elements.countDown.textContent = seconds;
        if(seconds <= 0){              
            elements.gameInput.disabled = false;              
            toggleDisplay(elements.countDownComponent)    
            clearInterval(countDownTimer);                 
            mainTimerHandler(playerState, gameObject);
            elements.gameInput.focus();
        }
    }, 1000)
}

export const clearMainTimer = () => {
    clearInterval(racerTimer);
}