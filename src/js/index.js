/*
TODO:
[x]Time component
[x]Speed component
[x]Racing PROGRESS finish race figure
[x]End of race statistics
[x]timers
[x]End of timer
[]continue gamemode
[]Create new games
[]Finish Header
[]When inspecting element user can change the value and can hack game
[]Security
*/
import { calculateAccuracy, calculateTypingSpeed } from './helpers/calculations';
import { countdownBeforeGame, clearMainTimer} from './models/time';
import { checkIfUserExists } from './models/header';
import { showStatistics } from './views/statisticsView';
const { updateRacerProgressView } = require('./views/racerView');
const { startPractice, createPlayerObj, newGame, injectWords, Race } = require('../js/models/Game');
const { elements, toggleDisplay } = require('./views/base');
require('../js/models/header');

//Controller
let gamemode;
let startTimer = false;
//on a new race
let races = []; //for guests with no accounts -- online games
let currentGameData;
let playerState;

//practice mode
elements.practiceButton.addEventListener('click', async() =>{
    gamemode = 'practice';
    let practiceUser = checkIfUserExists();        
    playerState = createPlayerObj(practiceUser) // initalize player state;    
    let newGameData = await startPractice();
    currentGameData = newGameData;
    newGame(newGameData,playerState);    
    elements.gameInput.disabled = true;
    countdownBeforeGame(playerState, currentGameData);        
    
});


elements.gameInput.addEventListener('input', (e) => {    
    const wordQuote = elements.theDiv.querySelectorAll('span.t');
    const inputArray = e.target.value.split('');
    let correct = true;    
    let turnInputRed = false;
    //update playerObject typing speed view
    updateRacerProgressView(playerState, currentGameData);
    wordQuote.forEach((word,index) => {
        const character = inputArray[index];
        if(character == null){
            word.classList.remove('hoverGreen');
            word.classList.remove('hoverRed');
            word.classList.add('hoverCurrent');
            correct = false;
            if(playerState.hash[index] !== undefined){
                playerState.hash[index] = undefined;
                if(playerState.currentLetters > 0){
                    playerState.currentLetters--;
                }
            }            
        }
        else if (character == word.innerText) {            
            word.classList.remove('hoverCurrent');
            word.classList.add('hoverGreen');
            word.classList.remove('hoverRed');   
            if(playerState.hash[index] == undefined){
                playerState.hash[index] = true;
                playerState.currentLetters ++;
            }
        }
        else {
            turnInputRed = true;
            word.classList.remove('hoverGreen');
            word.classList.remove('hoverCurrent');            
            word.classList.add('hoverRed'); 
            correct = false;
            if(playerState.hash[index] == undefined)    {
                playerState.hash[index] = false;
                playerState.currentLetters++;
                playerState.lettersWrong++;
            }
        }
    })
    if(turnInputRed){
        elements.gameInput.style = "background-color: #ff000052;"
    }else {
        elements.gameInput.style = "";
    }
    if(correct){
        if(playerState.currentWord === currentGameData.text.length -1){
            //create new race object and push it to guest 
            clearMainTimer();                                                         
            const accuracy = calculateAccuracy(playerState.lettersWrong, currentGameData.totalCharacters)
            const Wpm = calculateTypingSpeed(playerState.currentLetters, playerState.timeElapsed);
            //pass it Average WPM and reference to text.
            const finishedRaceData = new Race(accuracy,Wpm, playerState.timeElapsed , null);
            console.log(finishedRaceData);                     
            elements.gameInput.disabled = true;
            e.target.value = '';
            toggleDisplay(elements.gameStats);
            showStatistics(finishedRaceData);            
        }else {
            e.target.value = '';
            playerState.currentWord++;
            playerState.hash = {};
            playerState.correctWords++;
            injectWords(currentGameData.text, playerState);
        }
    }

})








 

