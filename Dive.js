
var Dive = function(plannedDepth, explorationTime, startTime = null) {

    this._plannedDepth = plannedDepth;

    this._explorationTime = explorationTime;

    this._startTime = startTime;

    this.matchedTable = matchDepthTable(this._plannedDepth, tables);

    this.matchedTime = matchExplorationTime(this._explorationTime, this.matchedTable);

    this.ascentTable = planAscent(this.matchedTime, this._plannedDepth);
    
    this.ascentTime = calcAscend(this.ascentTable);
    
    this.totalTime = calcTotalTime(this.ascentTime, this._explorationTime);
}
