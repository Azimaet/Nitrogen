//http://www.plongee-plaisir.com/fr/pdf/MN90_Mode_Emploi.pdf
//https://www.youtube.com/watch?v=S9F1De6Lesw

plannedDepth = 26;
explorationTime = 50;
startTime = 11.03;

var userDive = new Dive(plannedDepth, explorationTime, startTime);


console.log(userDive);
console.log(
    "-La plongée démarre à " + startTime + "." + "\r\n" +
    "-La profondeur max est de " + plannedDepth + "m. \r\n" +
    "-La durée d'exploration est de " + explorationTime + "mn, et la durée de remontée sera de " + userDive.ascentTime +"mn. \r\n" +
    "-La durée totale de la plongée sera donc de " + userDive.totalTime + "mn. \r\n" + 
    "-Le groupe de saturation des tissus sera de " + userDive.matchedTime.gps + "\r\n"
);