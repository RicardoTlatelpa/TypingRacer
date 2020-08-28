const { elements } = require('./base')
export const showStatistics = (race) => {
    elements.raceAccuracy.innerHTML = `${race.accuracy}%`;
    elements.raceWPM.innerHTML = `${race.avgWpm} WPM`;
    elements.raceEndTime.innerHTML = `${race.timeElapsed} seconds`;
    //TODO: Handle RefToText when actual text is good    
}