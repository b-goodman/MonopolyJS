import * as _ from "lodash";
import 'lodash.combinations';


/**
 * Single Die object
 * @class Die
 */
class Die{
    /**
     *Creates an instance of Die.
     * @param {*} sides The number of sides the Die has.
     * @memberof Die
     */
    sides: number;

    constructor(sides){
        this.sides = sides;
    };

    /**
     * Roll method.  Generates a random number.
     *
     * @returns {Number} A random integer between 1 and this.sides
     * @memberof Die
     */
    rollDie(){
        var min = 1;
        var max =this.sides;
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
};

/**
 * Dice object representing N dice.
 *
 * @class Dice
 */
export class Dice{
    /**
     *Creates an instance of Dice.
     * @param {*} sidesArray Each element in the array constructs a die with amount of sides equal to the array value.
     * @memberof Dice
     */
    dice: Array<Die>;
    value: number;
    faces: Array<number>;
    allEqual: boolean;
    rollProb: Object;
    constructor(sidesArray:Array<number>){
        //Create and hold instances of Die.
        this.dice = [];
        sidesArray.map(sides=>this.dice.push(new Die(sides)));

        //The sum of all face values of all dice once rolled
        this.value = null;
        
        //Array of dice face values once rolled
        this.faces = null;

        //true if all face values are equal, false otherwise
        this.allEqual = null;

        //object mapping possible value of each roll (key) to it's probability (value)
        this.rollProb = null;

        
        var input = this.dice.map(die=>die.sides);
        var rolloverCounter = 0;
        let rolloverValues: Array<number> = _.times(input.length, _.constant(0));  
        let output: Array<string> = [];
        let outCast: Array<Array<number>> = [];
        let outReduce: Array<number> = [];
        /**
         * Helper function for calculating roll probabilities.
         *
         * @param {*} index
         */
        function rollover(index) {
            if (index > 0 && (rolloverCounter % Math.pow(input[index], ((input.length - 1) - index))) == 0) {
                rollover(index - 1);
            };
            if (rolloverValues[index] == input[index]) {
                rolloverValues[index] = 1;
            } else {
                rolloverValues[index]++;
            }
        };
        /**
         * Helper function for calculating roll probabilities.
         *
         */
        function rollSequence() {
            let set: Array<number> = [];
            for (var i = 0; i < input.length; i++) {
                set[i] = 1;
            };
            //for each k = [0,K) reset counter digit EXCEPT the last (K), add corresponding kth rollover value if less than counter digit max (input[k])
            for (var k = 0; k < set.length - 1; k++) {
                if (rolloverValues[k] < input[k]) {
                    set[k] += rolloverValues[k];
                };
            };
            output.push(set.toString());
            while (_.last(set) < _.last(input)) {
                set[(input.length) - 1] += 1;
                output.push( set.toString() );
            };
            rolloverCounter++;
            rollover(input.length - 1);
        };
        while( ! _.isEqual(rolloverValues, input) ){rollSequence()};
        outCast = output.map(elem=>JSON.parse("[" + elem + "]"));
        outReduce = outCast.map( values => values.reduce( (a,b) => a+b ) );
        var freq = _.countBy(outReduce);
        this.rollProb = _.zipObject( Object.keys(freq), (<any>Object).values(freq).map(prob => 100 * (prob/ (<any>Object).values(freq).reduce( (a,b)=>a+b ))) );

        //init. Dice
        this.roll();

    };

    /**
     * Method for rolling dice.  Sets object values.
     *
     * @returns Randomly generated integer equal to the sum of the face values of all rolled dice.
     * @memberof Dice
     */
    roll(){
        this.faces = this.dice.map(die=>die.rollDie());
        this.value = this.faces.reduce((a,b)=>a+b);
        if(this.dice.length > 1){
            this.allEqual = this.faces.every(face=>face === this.faces[0]);
        }else{
            this.allEqual = false;
        };
        return this.value;
    }
}


// var dice = new Dice([6,6,3]);

// console.log(
//     dice.rollProb
// )


