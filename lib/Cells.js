"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rules_1 = require("./Rules");
var enums_1 = require("./enums");
var Cell_1 = require("./Cell");
;
;
// interface IStringStringMap extends IStringTMap<string> {};
var Cells = /** @class */ (function () {
    function Cells() {
        //"In Jail" is always at position 0
        //let jailCell:SpecialCell =  {type: CellType.SPECIAL, location:0, name:"In Jail", color:"Gray", actionPrimary:null, actionSecondary:null};
        //Cells.LOCATIONS[0] = new Cell( jailCell );
        Cells.add({ type: enums_1.CellType.SPECIAL, location: 0, name: "In Jail", color: "Gray", actionPrimary: null, actionSecondary: null }, 0);
        // "GO" is always at position 1
        // let goLandingValue: number = (Rules.GO_LANDING_BONUS_ENABLED ? Rules.GO_LANDING_BONUS_VALUE + Rules.PASS_GO_CREDIT : Rules.PASS_GO_CREDIT);
        // let goCell:SpecialCell =  {type: CellType.SPECIAL, location:1, name:"GO", color:"Gray", actionPrimary:"creditAbs", actionSecondary:goLandingValue};
        // Cells.LOCATIONS[1] = new Cell( goCell );
        var goLandingValue = (Rules_1.Rules.GO_LANDING_BONUS_ENABLED ? Rules_1.Rules.GO_LANDING_BONUS_VALUE + Rules_1.Rules.PASS_GO_CREDIT : Rules_1.Rules.PASS_GO_CREDIT);
        Cells.add({ type: enums_1.CellType.SPECIAL, location: 1, name: "GO", color: "Gray", actionPrimary: "creditAbs", actionSecondary: goLandingValue }, 1);
    }
    ;
    Cells.add = function (cellParams, location) {
        if (location) {
            location = Object.keys(Cells.LOCATIONS).length + 1;
        }
        ;
        var cell = new Cell_1.Cell(cellParams);
        Cells.LOCATIONS[location] = cell;
        Cells.PROPERTY_GROUP_SET[cell.groupID].push(cell);
    };
    /**
     * Gets the Cell object stored at position boardLocaion in the map
     * LOCATIONS.
     *
     * @param boardLocation the location of a position on the board counted from
     * GO = 1
     * @return the Cell object representing that position.
     */
    Cells.get = function (boardLocation) {
        return Cells.LOCATIONS[boardLocation];
    };
    Object.defineProperty(Cells, "jailExitLocation", {
        get: function () {
            return this._jailExitLocation;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * LOCATIONS maps the index (K) of each position on the game board to it's
     * defining Cell object (V).
     */
    Cells.LOCATIONS = {};
    Cells.PROPERTY_GROUP_SET = {};
    Cells.CELL_OWNERSHIP = {};
    Cells._jailExitLocation = 11;
    return Cells;
}());
exports.Cells = Cells;
