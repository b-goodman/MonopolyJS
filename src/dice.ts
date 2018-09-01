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
    private static _dice: Array<Die> = [];
    private static _value: number;
    private static _faces: Array<number>;
    private static _allEqual: boolean;
    private static _rollProb: Object;
    constructor(sidesArray:Array<number>){
        //Create and hold instances of Die.
        sidesArray.map(sides=>Dice._dice.push(new Die(sides)));

        //The sum of all face values of all dice once rolled
        Dice._value = null;
        
        //Array of dice face values once rolled
        Dice._faces = null;

        //true if all face values are equal, false otherwise
        Dice._allEqual = null;

        //object mapping possible value of each roll (key) to it's probability (value)
        Dice._rollProb = null;

        
        var input = Dice._dice.map(die=>die.sides);
        var rolloverCounter = 0;
        let rolloverValues: Array<number> = _.times(input.length, _.constant(0));  
        let output: Array<string> = [];
        let outCast: Array<Array<number>> = [];
        let outReduce: Array<number> = [];
       
        /**
         * Helper function for calculating roll probabilities.
         *
         * @param index
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
        Dice._rollProb = _.zipObject( Object.keys(freq), (<any>Object).values(freq).map(prob => 100 * (prob/ (<any>Object).values(freq).reduce( (a,b)=>a+b ))) );

        //init. Dice
        Dice.roll();

    };

    /**
     * Method for rolling dice.  Sets object values.
     *
     * @returns Randomly generated integer equal to the sum of the face values of all rolled dice.
     * @memberof Dice
     */
    public static get faces():Array<number>{
        return Dice._faces;
    }

    public static roll(){
        Dice._faces = Dice._dice.map(die=>die.rollDie());
        Dice._value = Dice._faces.reduce((a,b)=>a+b);
        if(Dice._dice.length > 1){
            Dice._allEqual = Dice._faces.every(face=>face === Dice._faces[0]);
        }else{
            Dice._allEqual = false;
        };
        return Dice._value;
    }

    public static get allEqual(): boolean{
        return Dice._allEqual;
    }

    public static get rollProb(): Object {
        return Dice._rollProb;
    }
}