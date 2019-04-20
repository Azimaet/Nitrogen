

//http://www.plongee-plaisir.com/fr/pdf/MN90_Mode_Emploi.pdf
//https://www.youtube.com/watch?v=S9F1De6Lesw

const ASCENDING_RATE_ABOVE_20M = 15; // Vitesse de remontée plongée peu profonde préconisée par MN90.
const ASCENDING_RATE_BELOW_20M = 10; // Vitesse de remontée plongée profonde préconisée par MN90.
const ASCENDING_RATE_IN_10M = 6; // Vitesse de remontée dans les 10 derniers mètres.
const SAFETY_STOP_LADDER = 3; // Echelle entre les paliers

function matchDepthTable(plannedDepth, tables) {
    var i = 0;

    if (plannedDepth > 65) {
        alert('Too Deep. Die or go Trimix!!');
    }
    else {
        do {
            i++;
        } while (plannedDepth > tables[i].depth);
        return tables[i];
    }
}

function matchExplorationTime(explorationTime, matchedTable) {
    var j = 0;

    if (explorationTime > matchedTable.dive[matchedTable.dive.length-1].duration ) {
        alert('Too long dive. Die or go Nitrox!!');
    }
    else {
        do {
            j++;
        } while (explorationTime > matchedTable.dive[j].duration);
        return matchedTable.dive[j];
    }
}

function planAscent(matchedTime, plannedDepth) {
    let stops = [12,9,6,3];
    let prefix = 'stop_';
    let ascendingDistance;
    let ascendingTime;
    let indexStop;
    let ascentTable = new Object();
    let ascendingRate;

    if (plannedDepth < 11)  ascendingRate = ASCENDING_RATE_IN_10M;
    else if (plannedDepth > 10 && plannedDepth < 20) ascendingRate = ASCENDING_RATE_ABOVE_20M;
    else ascendingRate = ASCENDING_RATE_BELOW_20M;

    for(let i = 0; i < stops.length ;i++) {
        indexStop = prefix + stops[i];

        if (matchedTime[indexStop] !== 0) {
            if (isEmpty(ascentTable)) { // If match first safety stop
                ascendingDistance = plannedDepth - stops[i];
            } 
            else {
                ascendingDistance = SAFETY_STOP_LADDER;
            }

            ascendingTime = ascendingDistance / ascendingRate;
            ascentTable["ascentDistanceTo_" + stops[i]] = ascendingDistance;
            ascentTable["ascentTimeTo_" + stops[i]] = ascendingTime;
            ascentTable["safetyStopAt_" + stops[i]] = matchedTime[indexStop];
        }

        // After first part of ascent, set ascendingRate to 6m/m
        ascendingRate = ASCENDING_RATE_IN_10M;
    }

    /* If SafetyStops (So must be SS_3, then add last value to ascending surface */
    ascentTable.ascentDistanceTo_0 = SAFETY_STOP_LADDER;
    ascentTable.ascentTimeTo_0 = SAFETY_STOP_LADDER / ASCENDING_RATE_IN_10M;

    return ascentTable;
}

function calcAscend(ascentTable) {
    let regexKeysAT = /ascentTimeTo_\w/g;
    let regexKeysSS = /safetyStopAt_\w/g;
    let ascentTime = 0;

    // Sum of all times.
    for (let key in ascentTable) {
        if (regexKeysSS.test(key) || regexKeysAT.test(key)){
            ascentTime += ascentTable[key];
        }
    }
    ascentTime = Math.ceil(ascentTime);
    return ascentTime;
}

function calcTotalTime(ascentTime, explorationTime) {
    var totalTime = ascentTime + explorationTime;
    return totalTime;
}