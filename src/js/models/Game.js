import { countdownBeforeGame, secondHandler } from './time';

//initalizing game..
const { elements, toggleDisplay, toggleHidden } = require('../views/base');

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

 const injectWords = () => {
    let insertedPhrase = [...wordIndexes];
    if(correctWords > 0) {
        for(let i = 0; i < correctWords; i++) {
            let greenSpan = createSpanWord(insertedPhrase[i], "hoverGreen").join('');
            insertedPhrase[i] = greenSpan;
        }
    }        
    let spanObj = createSpanWord(insertedPhrase[currentWord], "t");
    insertedPhrase[currentWord] = spanObj.join('');        
    elements.theDiv.innerHTML = insertedPhrase.join('');    
}

 const fetchText = (game) => {
    return fetch('https://uselessfacts.jsph.pl/random.json?language=en',
    {
    	method: "GET",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseData) => {      
      game.wordIndexes = parseQuote(responseData.text);
      game.totalCharacters = responseData.text.length;      
    })
    .catch(error => console.warn(error));
}

export const newGame = (gObj, pObj) => {
    fetchText(game).then(() => injectWords());
    pObj.currentLetters = 1;
    pObj.timeElapsed = 0;
    pObj.lettersWrong = 0;
    pObj.correctWords = 0;
    pObj.currentWord = 0;
    elements.currentSpeedEl.textContent = "0";
    toggleHidden(elements.triggerBtn);
    toggleHidden(elements.countDown);
    toggleDisplay(elements.globalTimer);
    countdownBeforeGame();
    setTimeout(() => {
        secondHandler();
    }, 5000);
}