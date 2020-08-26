const { elements, toggleDisplay } = require('../views/base');
const { timerUI } = require('../views/timerView');
const { updateRacerTimerUI } = require('../views/timerView');

export const secondHandler = () => {
    let startDate = Date.now();
    racerTimer = setInterval(() => {
        let m = parseInt(elements.minute.textContent);
        let s = parseInt(elements.second.textContent);
        let elapsedTime = Date.now() - startDate;
        let cSecond = ((elapsedTime / 1000) % 60).toFixed(0);
        if(m === 0 && s === 0) {
            //end game
            alert('You ran out of time :(');
        }else {
            updateRacerTimerUI(cSecond);
            playerState.timeElapsed++;
        }
    },1000);    
}

export function countdownBeforeGame(){ 
    let seconds = document.querySelector('#countdownNum').innerHTML;
    console.log(seconds);
    let countDownTimer = setInterval(function(){    
        seconds--;
        elements.countDown.textContent = seconds;
        if(seconds <= 0){                
            toggleDisplay(elements.countDownComponent)    
            clearInterval(countDownTimer);                 
        }
    }, 1000)
}