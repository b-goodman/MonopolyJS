import * as _ from "lodash";
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
    private static _jailExitLocation: number;

    constructor(cellData) {
        //"In Jail" is always at position 0
        Cells.add( {type: CellType.SPECIAL, location:0, name:"In Jail", color:"Gray", actionPrimary:null, actionSecondary:null} ,0 );

       // "GO" is always at position 1
        let goLandingValue: number = (Rules.GO_LANDING_BONUS_ENABLED ? Rules.GO_LANDING_BONUS_VALUE + Rules.PASS_GO_CREDIT : Rules.PASS_GO_CREDIT);
        Cells.add({type: CellType.SPECIAL, location:1, name:"GO", color:"Gray", actionPrimary:"creditAbs", actionSecondary:goLandingValue}, 1);

        //load custom cells from cellData
        (<any>cellData).map(cell => Cells.add(cell, cell.location));
        //find location of "Visiting Jail" and set as jail exit location
        Cells._jailExitLocation = _.findIndex( Object.keys(Cells.LOCATIONS).map(key=>Cells.LOCATIONS[key]), function(cell){ return cell.name == "Visiting Jail"; });
    };

    public static add( cellParams: PropertyCell | SpecialCell | RailroadCell | UtilityCell, location?: number ){
        if(location == undefined){
            location = Object.keys(Cells.LOCATIONS).length;
        };
        let cell: Cell = new Cell( cellParams );
        Cells.LOCATIONS[location] = cell;
        if( Cells.PROPERTY_GROUP_SET[cell.groupID] == undefined ){
            Cells.PROPERTY_GROUP_SET[cell.groupID] = [cell];
        }else{
            try{
                Cells.PROPERTY_GROUP_SET[cell.groupID].push(cell);
            }catch (error){
                console.log(error);
                console.log(cell);
            }
        }
        // Cells.PROPERTY_GROUP_SET[cell.groupID].push(cell);
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
 