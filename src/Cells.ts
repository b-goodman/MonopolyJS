import { Rules } from './Rules';
import { CellType } from './enums';
import { Cell, SpecialCell, PropertyCell, RailroadCell, UtilityCell } from './Cell';


interface INumberTMap<T> { [key: number]: T; };

interface NumberCellMap extends INumberTMap<Cell> {};

// interface IStringStringMap extends IStringTMap<string> {};

export class Cells {

    /**
     * LOCATIONS maps the index (K) of each position on the game board to it's
     * defining Cell object (V).
     */
    public static LOCATIONS: NumberCellMap = {};
    public static PROPERTY_GROUP_SET = {};
    public static CELL_OWNERSHIP = {};
    private static _jailExitLocation = 11;

    constructor() {
        //"In Jail" is always at position 0
        //let jailCell:SpecialCell =  {type: CellType.SPECIAL, location:0, name:"In Jail", color:"Gray", actionPrimary:null, actionSecondary:null};
        //Cells.LOCATIONS[0] = new Cell( jailCell );

        Cells.add( {type: CellType.SPECIAL, location:0, name:"In Jail", color:"Gray", actionPrimary:null, actionSecondary:null} ,0 );

       // "GO" is always at position 1
        // let goLandingValue: number = (Rules.GO_LANDING_BONUS_ENABLED ? Rules.GO_LANDING_BONUS_VALUE + Rules.PASS_GO_CREDIT : Rules.PASS_GO_CREDIT);
        // let goCell:SpecialCell =  {type: CellType.SPECIAL, location:1, name:"GO", color:"Gray", actionPrimary:"creditAbs", actionSecondary:goLandingValue};
        // Cells.LOCATIONS[1] = new Cell( goCell );

        let goLandingValue: number = (Rules.GO_LANDING_BONUS_ENABLED ? Rules.GO_LANDING_BONUS_VALUE + Rules.PASS_GO_CREDIT : Rules.PASS_GO_CREDIT);
        Cells.add({type: CellType.SPECIAL, location:1, name:"GO", color:"Gray", actionPrimary:"creditAbs", actionSecondary:goLandingValue}, 1);

    };

    public static add( cellParams: PropertyCell | SpecialCell | RailroadCell | UtilityCell, location?: number ){
        if(location){
            location = Object.keys(Cells.LOCATIONS).length + 1;
        };
        let cell: Cell = new Cell( cellParams );
        Cells.LOCATIONS[location] = cell;
        Cells.PROPERTY_GROUP_SET[cell.groupID].push(cell);
    }

    /**
     * Gets the Cell object stored at position boardLocaion in the map
     * LOCATIONS.
     *
     * @param boardLocation the location of a position on the board counted from
     * GO = 1
     * @return the Cell object representing that position.
     */
    public static get(boardLocation: number): Cell {
        return Cells.LOCATIONS[boardLocation];
    }

    public static get jailExitLocation(){
        return this._jailExitLocation;
    }

}
 