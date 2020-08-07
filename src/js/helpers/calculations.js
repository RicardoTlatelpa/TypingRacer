export const calculateAccuracy = (w,t) => {
    let correctLetters = t - w;
    return Math.floor((correctLetters/t) * 100);
}

export const calculateAverageSpeed = (arrayOfRaces) => {
    let total = arrayOfRaces.length;
    let sum = 0;
    if(total < 1){
        return 0;
    }
    for(let i = 0; i < arrayOfRaces.length; i++){
        sum+= arrayOfRaces[i].speed;
    }
    return Math.floor(sum/total);
}