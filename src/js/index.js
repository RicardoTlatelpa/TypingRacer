/*
TODO:
[]When inspecting element user can change the value and can hack game
[]Racing PROGRESS finish race figure
*/
import axios from 'axios';
require('../js/models/header');
require('../sass/main.scss');
//Controller
class Race {
    constructor(speed, username = "Guest") {
        this.speed = speed;
        this.user = user;
    }
}
let startTimer = false;
let gameState = {
    wordIndexes: null,
    totalCharacters: null,
    currentWord: 1    
}

let playerState = {
    currentLetters: 1,
    correctWords: 0,
    lettersWrong: 0,
    timeElapsed: 0,
    timeElapsedInMinutes: null,
    races: [],
    hash: {}
}

let racerTimer;








 

