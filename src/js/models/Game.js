import { countdownBeforeGame, secondHandler } from './time';
import axios from 'axios';
const { elements, toggleDisplay, toggleHidden } = require('../views/base');
//initalizing game..

class Game{
    constructor(text,totalCharacters, estimatedTime){
        this.text = text;
        this.totalCharacters = totalCharacters;     
        this.estimatedTime = estimatedTime;  
    }
}
class Player{
    constructor(id) {
        this.id = id;
        this.currentLetters = 1;
        this.currentWord = 0;
        this.correctWords = 0;
        this.lettersWrong = 0;
        this.timeElapsed = null;
        this.hash = {};
        this.races = [];
    }
}
export class Race{
    constructor(accuracy, avgWpm, refToText){
        this.accuracy = accuracy;
        this.avgWpm = avgWpm;
        this.refToText = refToText;
    }
}

const parseQuote = (quote) => {
    let array = quote.split(' ');
    for(let i = 0; i < array.length -1 ; i++){
        array[i] =  array[i] + ' ';
     }
     return array;
}
function createSpanWord(word, letter){
    let span = [];    

    word.split('').forEach(el => {
        span.push(`<span class = "${letter}">${el}</span>`)
    });
    return span;
}
//update the race for the user 
 export const injectWords = (text, pObj) => {

    let insertedPhrase = [...text];
    
    //in game check of correct words
    if(pObj.correctWords > 0) {
        for(let i = 0; i < pObj.correctWords; i++) {
            let greenSpan = createSpanWord(insertedPhrase[i], "hoverGreen").join('');
            insertedPhrase[i] = greenSpan;
        }
    }        
    
    //injecting words into the dom as user types
    let spanObj = createSpanWord(insertedPhrase[pObj.currentWord], "t");
    insertedPhrase[pObj.currentWord] = spanObj.join('');        
    elements.theDiv.innerHTML = insertedPhrase.join('');    
}

 const fetchText = async() => {    
    try {
        return await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
    }catch(err){
        console.log(err);
    }
}

const createGame = async() => {
    let response = await fetchText();    
    let parsedData = parseQuote(response.data.text);
    let totalCharacters = response.data.text.length;
    return new Game(parsedData, totalCharacters, null);
}
//create a new player object data every race
export const createPlayerObj = (id) => {
    return new Player(id);
}
//initialize game
export const newGame = (gameObject, player) => {    
    injectWords(gameObject.text, player);    
}
//pass game data to controller
export const startPractice = async() =>{    
    //step1 create a game
    let gameObject = await createGame()
    //step 2 change the menu to game           
    toggleDisplay(elements.main_menu);
    toggleDisplay(elements.gameContainer);
    //step 3 display game and countdown
    return gameObject;
}