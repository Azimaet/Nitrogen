
var Dive = function(plannedDepth, explorationTime, startTime = null) {

    this._plannedDepth = plannedDepth;

    this._explorationTime = explorationTime;

    this._startTime = startTime;

    this.ascentTime = null;

    this.totalTime = null;

}
