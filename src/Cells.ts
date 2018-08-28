import { Rules } from './Rules';
import { CellType } from './enums';
import { Cell, SpecialCell } from './Cell';


interface INumberTMap<T> { [key: number]: T; };
interface NumberCellMap extends INumberTMap<Cell> {};
// interface IStringStringMap extends IStringTMap<string> {};

export class Cells {

    /**
     * LOCATIONS maps the index (K) of each position on the game board to it's
     * defining Cell object (V).
     */
    public static LOCATIONS: NumberCellMap = {};
    public static PROPERTY_GROUP_SET: Array<string> = [];

    constructor(cellData:any) {
        //"In Jail" is always at position 0
        let jailCell:SpecialCell =  {type: CellType.SPECIAL, location:0, name:"In Jail", color:"Gray", actionPrimary:null, actionSecondary:null};
        Cells.LOCATIONS[0] = new Cell( jailCell );

        //"GO" is always at position 1
        let goLandingValue: number = (Rules.GO_LANDING_BONUS_ENABLED ? Rules.GO_LANDING_BONUS_VALUE + Rules.PASS_GO_CREDIT : Rules.PASS_GO_CREDIT);
        let goCell:SpecialCell =  {type: CellType.SPECIAL, location:1, name:"GO", color:"Gray", actionPrimary:"creditAbs", actionSecondary:goLandingValue};
        Cells.LOCATIONS[1] = new Cell( goCell );

    };

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


    // //TODO - test set build, post to proprty group edit box
    // public static Set<Character> getPropertyGroups() {
    //     //for all cells, get type.  if type PROPERTY, get property group, add to set, return
    //     for (Cell cell : LOCATIONS.values()) {
    //         if (cell.getCellType() == PROPERTY) {
    //             PROPERTY_GROUP_SET.add(cell.getPropertyGroupID());
    //         }
    //     }
    //     return PROPERTY_GROUP_SET;
    // }
}
 