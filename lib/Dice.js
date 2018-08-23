"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
require("lodash.combinations");
/**
 * Single Die object
 * @class Die
 */
var Die = /** @class */ (function () {
    function Die(sides) {
        this.sides = sides;
    }
    ;
    /**
     * Roll method.  Generates a random number.
     *
     * @returns {Number} A random integer between 1 and this.sides
     * @memberof Die
     */
    Die.prototype.rollDie = function () {
        var min = 1;
        var max = this.sides;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Die;
}());
;
/**
 * Dice object representing N dice.
 *
 * @class Dice
 */
var Dice = /** @class */ (function () {
    function Dice(sidesArray) {
        var _this = this;
        //Create and hold instances of Die.
        this.dice = [];
        sidesArray.map(function (sides) { return _this.dice.push(new Die(sides)); });
        //The sum of all face values of all dice once rolled
        this.value = null;
        //Array of dice face values once rolled
        this.faces = null;
        //true if all face values are equal, false otherwise
        this.allEqual = null;
        //object mapping possible value of each roll (key) to it's probability (value)
        this.rollProb = null;
        var input = this.dice.map(function (die) { return die.sides; });
        var rolloverCounter = 0;
        var rolloverValues = _.times(input.length, _.constant(0));
        var output = [];
        var outCast = [];
        var outReduce = [];
        /**
         * Helper function for calculating roll probabilities.
         *
         * @param {*} index
         */
        function rollover(index) {
            if (index > 0 && (rolloverCounter % Math.pow(input[index], ((input.length - 1) - index))) == 0) {
                rollover(index - 1);
            }
            ;
            if (rolloverValues[index] == input[index]) {
                rolloverValues[index] = 1;
            }
            else {
                rolloverValues[index]++;
            }
        }
        ;
        /**
         * Helper function for calculating roll probabilities.
         *
         */
        function rollSequence() {
            var set = [];
            for (var i = 0; i < input.length; i++) {
                set[i] = 1;
            }
            ;
            //for each k = [0,K) reset counter digit EXCEPT the last (K), add corresponding kth rollover value if less than counter digit max (input[k])
            for (var k = 0; k < set.length - 1; k++) {
                if (rolloverValues[k] < input[k]) {
                    set[k] += rolloverValues[k];
                }
                ;
            }
            ;
            output.push(set.toString());
            while (_.last(set) < _.last(input)) {
                set[(input.length) - 1] += 1;
                output.push(set.toString());
            }
            ;
            rolloverCounter++;
            rollover(input.length - 1);
        }
        ;
        while (!_.isEqual(rolloverValues, input)) {
            rollSequence();
        }
        ;
        outCast = output.map(function (elem) { return JSON.parse("[" + elem + "]"); });
        outReduce = outCast.map(function (values) { return values.reduce(function (a, b) { return a + b; }); });
        var freq = _.countBy(outReduce);
        this.rollProb = _.zipObject(Object.keys(freq), Object.values(freq).map(function (prob) { return 100 * (prob / Object.values(freq).reduce(function (a, b) { return a + b; })); }));
        //init. Dice
        this.roll();
    }
    ;
    /**
     * Method for rolling dice.  Sets object values.
     *
     * @returns Randomly generated integer equal to the sum of the face values of all rolled dice.
     * @memberof Dice
     */
    Dice.prototype.roll = function () {
        var _this = this;
        this.faces = this.dice.map(function (die) { return die.rollDie(); });
        this.value = this.faces.reduce(function (a, b) { return a + b; });
        if (this.dice.length > 1) {
            this.allEqual = this.faces.every(function (face) { return face === _this.faces[0]; });
        }
        else {
            this.allEqual = false;
        }
        ;
        return this.value;
    };
    return Dice;
}());
exports.Dice = Dice;
// var dice = new Dice([6,6,3]);
// console.log(
//     dice.rollProb
// )
