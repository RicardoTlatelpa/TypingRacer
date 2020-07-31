/*in charge of changing the view for all clients 
that joined the server
*/
const { calculateAverageSpeed } = require('../helpers/calculations');

export const headerDataUI = (raceArray) => {
    let numOfRaces = raceArray.length;
    let avgSpeed = calculateAverageSpeed(raceArray);
    let avgElement = document.querySelector('.average-data');
    let totalRaces = document.querySelector('.races');
    avgElement.textContent = avgSpeed;
    totalRaces.textContent = numOfRaces;
}