/*
TODO:
[]When inspecting element user can change the value and can hack game
[]Racing PROGRESS finish race figure
*/
import axios from 'axios';
const { startPractice, createPlayerObj, newGame, injectWords } = require('../js/models/Game');
const { elements } = require('./views/base');

require('../js/models/header');

//Controller
let startTimer = false;
//on a new race
let currentGameData;
let playerState;
let races = []; //for guests with no accounts 
let racerTimer;

elements.practiceButton.addEventListener('click', async() =>{
    let practiceUser = createPlayerObj('guest');        
    playerState = practiceUser // initalize player state;
    let newGameData = await startPractice();
    currentGameData = newGameData;
    newGame(newGameData,practiceUser);    
})

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
            elements.gameInput.disabled = true;
        }else {
            e.target.value = '';
            playerState.currentWord++;
            playerState.hash = {};
            playerState.correctWords++;
            injectWords(currentGameData.text, playerState);
        }
    }
})








 

