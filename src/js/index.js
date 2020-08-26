/*
TODO:
[]When inspecting element user can change the value and can hack game
[]Racing PROGRESS finish race figure
[]Finish Header
[]Time component
[]Speed component
[]Security
[]Create new games
[]End of race statistics
[timers]
*/
import axios from 'axios';
import { calculateAccuracy } from './helpers/calculations';
import { countdownBeforeGame } from './models/time';
const { startPractice, createPlayerObj, newGame, injectWords, Race } = require('../js/models/Game');
const { elements } = require('./views/base');

require('../js/models/header');

//Controller
let online = false;
let startTimer = false;
//on a new race
let currentGameData;
let playerState;
let races = []; //for guests with no accounts 
let racerTimer;




//practice mode
elements.practiceButton.addEventListener('click', async() =>{
    let practiceUser = createPlayerObj('guest');        
    playerState = practiceUser // initalize player state;
    let newGameData = await startPractice();
    currentGameData = newGameData;
    newGame(newGameData,practiceUser);    
    countdownBeforeGame();
                            
    elements.gameInput.disabled = false;
    elements.gameInput.focus();
});


elements.gameInput.disabled = true;

elements.gameInput.addEventListener('input', (e) => {    
    const wordQuote = elements.theDiv.querySelectorAll('span.t');
    const inputArray = e.target.value.split('');
    let correct = true;
    //update playerObject typing speed view
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

    if(correct){
        if(playerState.currentWord === currentGameData.text.length -1){
            //create new race object and push it to guest             
            const accuracy = calculateAccuracy(playerState.lettersWrong, currentGameData.totalCharacters)
            //pass it Average WPM and reference to text.
            const finishedRaceData = new Race(accuracy, null, null);
            if(online){
                console.log('you are online!');//jk update the database 
            }            
            elements.gameInput.disabled = true;
            e.target.value = '';
        }else {
            e.target.value = '';
            playerState.currentWord++;
            playerState.hash = {};
            playerState.correctWords++;
            injectWords(currentGameData.text, playerState);
        }
    }



})








 

