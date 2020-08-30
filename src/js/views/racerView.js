const { elements } = require('./base');
const { calculatePercentageDone } = require('../helpers/calculations');
export const updateRacerProgressView = (pObj, gObj) => {
    const percentageDone = calculatePercentageDone(pObj, gObj);    
    elements.currentRaceProgress.style = `width: ${percentageDone}%;`
}