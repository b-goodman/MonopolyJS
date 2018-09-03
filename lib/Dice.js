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
        //Create and hold instances of Die.
        sidesArray.map(function (sides) { return Dice._dice.push(new Die(sides)); });
        //The sum of all face values of all dice once rolled
        Dice._value = null;
        //Array of dice face values once rolled
        Dice._faces = null;
        //true if all face values are equal, false otherwise
        Dice._allEqual = null;
        //object mapping possible value of each roll (key) to it's probability (value)
        Dice._rollProb = null;
        var input = Dice._dice.map(function (die) { return die.sides; });
        var rolloverCounter = 0;
        var rolloverValues = _.times(input.length, _.constant(0));
        var output = [];
        var outCast = [];
        var outReduce = [];
        /**
         * Helper function for calculating roll probabilities.
         *
         * @param index
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
        var p = Object.keys(freq).map(function (key) { return freq[key]; });
        Dice._rollProb = _.zipObject((Object.keys(freq).map(function (str) { return parseInt(str); })), p.map(function (prob) { return 100 * (prob / p.reduce(function (a, b) { return a + b; })); }));
        //init. Dice
        Dice.roll();
    }
    ;
    Object.defineProperty(Dice, "faces", {
        /**
         * Method for rolling dice.  Sets object values.
         *
         * @returns Randomly generated integer equal to the sum of the face values of all rolled dice.
         * @memberof Dice
         */
        get: function () {
            return Dice._faces;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dice, "value", {
        get: function () {
            return Dice._value;
        },
        enumerable: true,
        configurable: true
    });
    Dice.roll = function () {
        Dice._faces = Dice._dice.map(function (die) { return die.rollDie(); });
        Dice._value = Dice._faces.reduce(function (a, b) { return a + b; });
        if (Dice._dice.length > 1) {
            Dice._allEqual = Dice._faces.every(function (face) { return face === Dice._faces[0]; });
        }
        else {
            Dice._allEqual = false;
        }
        ;
        return Dice._value;
    };
    Object.defineProperty(Dice, "allEqual", {
        get: function () {
            return Dice._allEqual;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dice, "rollProb", {
        get: function () {
            return Dice._rollProb;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *Creates an instance of Dice.
     * @param {*} sidesArray Each element in the array constructs a die with amount of sides equal to the array value.
     * @memberof Dice
     */
    Dice._dice = [];
    Dice._rollProb = {};
    return Dice;
}());
exports.Dice = Dice;
