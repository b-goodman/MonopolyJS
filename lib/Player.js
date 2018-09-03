"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Players_1 = require("./Players");
// import { LogEntry } from "./LogEntry";
var Rules_1 = require("./Rules");
var Cells_1 = require("./Cells");
var Dice_1 = require("./Dice");
var Player = /** @class */ (function () {
    //log of players current turn
    // private _logEntry: LogEntry;
    /**
     * Constructor for player. User may specify players starting cash,
     * _position and amount of jail bonds avaliable.
     *
     * @param playerID Unique integer to identify player and locate in static
     * PLAYERS map.
     * @param name String to identify players to user
     * @param token Token enum to visually locate player on game board
     * @param _position The starting location for the player. _position 1 by
     * default.
     * @param cash The starting cash amount for the player. 1500 by default
     * @param jailBondsAvaliable The amount of jail bonds avaliable to the
     * player. 0 by default.
     */
    function Player(playerID, name, token) {
        this._ID = playerID;
        this._name = name;
        this._token = token;
        this.__position = 1;
        this._cash = Rules_1.Rules.INITIAL_PLAYER_CASH;
    }
    Object.defineProperty(Player.prototype, "ID", {
        //Get player's -
        /**
         * Returns the players unique integer identifier
         *
         * @return int - players ID
         */
        get: function () {
            return this._ID;
        },
        set: function (newID) {
            this._ID = newID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "name", {
        /**
         * Returns the players name
         *
         * @return String - player's name
         */
        get: function () {
            return this._name;
        },
        set: function (newName) {
            this._name = newName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "token", {
        /**
         * Returns the players token (enum)
         *
         * @return enum - player's token
         */
        get: function () {
            return this._token;
        },
        set: function (newToken) {
            this._token = newToken;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "_position", {
        /**
         * Returns the _position of the player in terms of its location on the game
         * board/index of LOCATIONS
         *
         * @return LOCATIONS key / board _position
         */
        get: function () {
            return this.__position;
        },
        //Set players:
        //    /**
        //     * Sets the player as being in Jail.
        //     *
        //     * @param jailState True: in Jail, False otherwise.
        //     */
        //    public void setJailState(boolean jailState) {
        //        inJail = jailState;
        //    }
        //    /**
        //     * Sets the amount of time (in turns) the player has currently been in jail
        //     * for.
        //     *
        //     * @param time
        //     */
        //    public void setJailTimeSpent(int time) {
        //        jailTimeSpent = time;
        //    }
        /**
         * Set new _position for player on game board
         *
         * @param new_position Location on game board given as index of Cells
         * _position in LOCATIONS
         */
        set: function (new_position) {
            this.__position = new_position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "cash", {
        set: function (newCash) {
            this._cash = newCash;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the type of cell which the player is currently occupying
     *
     * @return [string] Cell type currently occupied by player.
     */
    Player.prototype.getCurrentCell = function () {
        return Cells_1.Cells.get(this.__position);
    };
    Player.prototype.get_positionType = function () {
        return this.getCurrentCell().type;
    };
    Player.prototype.getActionType = function () {
        return this.getCurrentCell().actionPrimary;
    };
    Player.prototype.getActionParamater = function () {
        return this.getCurrentCell().actionSecondary;
    };
    /**
     * Gets name of current _position cell
     *
     * @return
     */
    Player.prototype.get_positionName = function () {
        return this.getCurrentCell().name;
    };
    /**
     * Gets name of specified cell
     *
     * @param cell_position [int] specification for cell. Cells _position on
     * board.
     * @return [String] Name of cell
     */
    Player.prototype.getCellName = function (cell_position) {
        return Cells_1.Cells.get(cell_position).name;
    };
    /**
     * Return amount of "get out of jail free" card(s) avaliable to the player
     *
     * @return
     */
    Player.prototype.getBondsAvaliable = function () {
        return this._jailBondsAvaliableChance + this._jailBondsAvaliableChest;
    };
    Object.defineProperty(Player.prototype, "inJail", {
        /**
         * Is the player in jail? T/F
         *
         * @return True if player is in jail, False otherwise.
         */
        get: function () {
            return this._inJail;
        },
        set: function (newJailState) {
            this._inJail = newJailState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "jailTimeSpent", {
        /**
         * How many consecutive turns has the player spent in jail
         *
         * @return [int] number of turns spent in current 'in jail' event.
         */
        get: function () {
            return this._jailTimeSpent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "speedingCount", {
        /**
         * How many doubles has the player rolled so far this turn? Resets to 0 at
         * end of turn.
         *
         * @return [int] amount of doubles rolled on this current turn.
         */
        get: function () {
            return this._speedingCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "currentCard", {
        /**
         * Returns last card drawn by this player
         *
         * @return [List] Card last drawn by player.
         */
        get: function () {
            return this._currentCard;
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     *
     * @param payingPlayerID [0,1,2...] for players.  use -1 for bank
     * @param cashAmount
     */
    Player.prototype.playerCashReceive = function (payingPlayerID, cashAmount) {
        if (payingPlayerID >= 0) {
            var payingPlayer = Players_1.Players.get(payingPlayerID);
            this._cash += cashAmount;
            payingPlayer.cash -= cashAmount;
            // logEntry.logEvent(RECEIVE, cashAmount, payingPlayerID);
        }
        else {
            this._cash += cashAmount;
            // logEntry.logEvent(RECEIVE, cashAmount, payingPlayerID);
        }
    };
    ;
    Player.prototype.playerCashPay = function (recievingPlayerID, cashAmount) {
        if (recievingPlayerID >= 0) {
            var recievingPlayer = Players_1.Players.get(recievingPlayerID);
            this._cash -= cashAmount;
            recievingPlayer.cash += cashAmount;
            // logEntry.logEvent(PAY, cashAmount, recievingPlayerID);
        }
        else {
            this._cash -= cashAmount;
            // logEntry.logEvent(PAY, cashAmount, recievingPlayerID);
        }
    };
    ;
    //    /**
    //     * Add(take) a "Get out of jail free card" to(from) the player
    //     *
    //     * @param addAmmount Positive(negative) integer value will give to(remove
    //     * from) player
    //     */
    //    public void addJailBond(int addAmmount) {
    //        jailBondsAvaliable += addAmmount;
    //    }
    /**
     * Sets player as owner of specified Cell at location on game board
     *
     * @param propertyBoardLocation The location of the property in terms of its
     * _position on the game board/index in LOCATIONS
     */
    Player.prototype.setOwnership = function (propertyBoardLocation) {
        var cell = (Cells_1.Cells.get(propertyBoardLocation));
        cell.setOwnership(this._ID);
        Cells_1.Cells.CELL_OWNERSHIP[cell] = this._ID;
    };
    ;
    //look through Cells.getPlayerOwnership()
    //return all cells with value == this.playerID
    Player.prototype.getOwnership = function () {
        var result = _.pickBy(Cells_1.Cells.CELL_OWNERSHIP, function (value, key) {
            return _.startsWith(value, this._ID);
        });
        return Object.values(result);
    };
    ;
    Player.prototype.getCompleteSets = function () {
        return _.groupBy(this.getOwnership().filter(function (cell) { return cell.isSetComplete(); }), function (cell) {
            cell.groupID;
        });
    };
    ;
    Player.prototype.getPropertyGroupMembers = function (groupID) {
        return this.getOwnership().filter(function (cell) { return cell.groupID == groupID; });
    };
    ;
    Player.prototype.getCompleteSetID = function () {
        return _.uniq(Object.keys(this.getCompleteSets()));
    };
    ;
    Player.prototype.addPropertyImprovementByGroup = function (groupID) {
        this.getPropertyGroupMembers(groupID).map(function (cell) { return cell.addImprovement(); });
    };
    /**
     * Adds an improvement to each property with groupID
     */
    // public addPropertyImprovementByGroup(groupID: string) {
    //     let ownedCells = this.getOwnership();
    //     let ownedGroupCells: Array<Cell> = ownedCells.filter(cell => cell.groupID == groupID)
    //     ownedGroupCells.map( cell => cell.addImprovement());
    // }
    // ---------------------------------------------
    //calculating player worth
    Player.prototype.getOwnedPropertyImprovementValue = function () {
        var propertyImprovementValues = this.getOwnership().map(function (cell) { return function (cell) {
            if (cell.getHotelCount() == 0) {
                if (cell.getHouseCount() == 0) {
                    //property has no improvements
                    return 0;
                }
                else {
                    //property has no hotels but >0 houses
                    return (cell.hotelCount * cell.houseValue * (1 / Rules_1.Rules.IMPROVEMENT_RESALE_PENALTY));
                }
            }
            else {
                //property has >0 hotel
                return ((Rules_1.Rules.PROPERTY_HOTEL_REQ * cell.houseValue) + cell.hotelValue) * (1 / Rules_1.Rules.IMPROVEMENT_RESALE_PENALTY);
            }
        }; });
        return propertyImprovementValues.reduce(function (a, b) { return a + b; });
    };
    ;
    Player.prototype.getOwnedPropertyBaseValue = function () {
        return this.getOwnership().map(function (cell) { return cell.mortgageValue; }).reduce(function (a, b) { return a + b; });
    };
    Player.prototype.getOwnedPropertyNetValue = function () {
        return this.getOwnedPropertyBaseValue() + this.getOwnedPropertyImprovementValue();
    };
    Player.prototype.getPlayerNetWorth = function () {
        return this.cash + this.getOwnedPropertyNetValue();
    };
    //-------------------------------------------------------
    Player.prototype.mortgageProperty = function (propertyID) {
        Cells_1.Cells.get(propertyID).mortgageProperty();
    };
    Player.prototype.unMortgageProperty = function (propertyID) {
        Cells_1.Cells.get(propertyID).unmortgageProperty();
    };
    /**
     * Returns cells type for specified location
     *
     * @param cellLocation Location of cell on game board
     * @return [String] type of cell ("property","railroad","utility"...)
     */
    Player.prototype.getCellType = function (cellLocation) {
        return Cells_1.Cells.LOCATIONS[cellLocation].type;
    };
    /**
     * Sends the player to jail by setting the players inJail state to True and
     * _positions the player to 0.
     */
    Player.prototype.gotoJail = function () {
        // this.logEntry.logEvent(JUMP, 0);
        this._inJail = true;
        this._position = 0;
    };
    /**
     * Exits the player from jail; sets inJail state as False, re_positions the
     * player back onto the game board and resets the jail time counter.
     */
    Player.prototype.leaveJail = function () {
        this._inJail = false;
        this._position = Cells_1.Cells.jailExitLocation;
        this._jailTimeSpent = 0;
        this._exitingJail = true;
        // logEntry.logEvent(NOTIFICATION, "player exits jail");
    };
    Player.prototype.exitingJail = function () {
        return this._exitingJail;
    };
    //end set
    /**
     * Returns board location of next specified cell type
     *
     * @param target [String] Type of cell to search for
     * @return [int] Board location of target cell
     */
    Player.prototype.findNextCellType = function (target) {
        var i = this._position;
        var search = this.getCellType(i);
        while (search != target) {
            i++;
            while (i > 40) {
                i -= Object.keys(Cells_1.Cells.LOCATIONS).length - 1;
            }
            search = this.getCellType(i);
        }
        return i;
    };
    ;
    Player.prototype.cashSignificance = function (debitValue) {
        var returnValue = 0;
        var sig = (debitValue / this._cash) * 100;
        if (sig >= 10 && sig < 20) {
            returnValue = 1;
        }
        else if (sig >= 20 && sig < 40) {
            returnValue = 2;
        }
        else if (sig > 40) {
            returnValue = 3;
        }
        return returnValue;
    };
    Player.prototype.cellBenefit = function (testLocation) {
        var benefit = 0;
        //check if cell is ownable
        if (testLocation.isOwnable) {
            //check if owned
            if (testLocation.isOwnable == null) {
                //is unowned
                benefit += 2;
                //does player already own part of set
                var freq = 0;
                var testID_1 = testLocation.groupID;
                this.getOwnership().filter(function (cell) { return cell.groupID == testID_1; });
                //if so, inc. benefit
                if (freq > 0) {
                    benefit++;
                    //and does the property complete a set
                    if (freq == testLocation.getGroupFrequency() - 1) {
                        benefit++;
                    }
                }
            }
            else {
                //property is onwed, get rent
                //is type UTILITY
                var testRent = testLocation.getCurrentRent();
                //is the rent significant
                benefit -= this.cashSignificance(testRent);
            }
        }
        else {
            switch (testLocation.actionPrimary) {
                case "drawCard":
                    if ("chest" == testLocation.actionSecondary) {
                        //assume chest to have good outcome
                        benefit++;
                    }
                    else {
                        //assume chest to have nominal to negative outcome
                        benefit--;
                    }
                    break;
                case "debitAbs":
                case "debitRel":
                    benefit -= this.cashSignificance(testLocation.actionSecondary);
                    break;
                case "creditAbs":
                case "creditRel":
                    benefit += this.cashSignificance(testLocation.actionSecondary);
                    break;
                case "parking":
                    //defualt action is null, thus a positive outcome
                    benefit++;
                    //is bonus enabled
                    if (Rules_1.Rules.FREE_PARKING_BONUS_ENABLED) {
                        benefit += this.cashSignificance(Rules_1.Rules.FREE_PARKING_BONUS_VALUE);
                    }
                    break;
                case "transitionAbs":
                    if ("0" == testLocation.actionSecondary) {
                        benefit--;
                    }
                    else {
                        benefit = this.cellBenefit(testLocation.actionSecondary);
                    }
                    break;
                case "transitionRel":
                    var newLocation = testLocation.location + testLocation.actionSecondary;
                    var newCell = Cells_1.Cells.get(newLocation);
                    benefit = this.cellBenefit(newCell);
                    break;
            }
        }
        return benefit;
    };
    Player.prototype.leaveJailEarly = function () {
        var leaveJail = false;
        var leaveJailFrom = Cells_1.Cells.jailExitLocation;
        var resultsPositive = 0;
        var resultsNegative = 0;
        var roll = Object.keys(Dice_1.Dice.rollProb);
        for (var val in roll) {
            var testCell = Cells_1.Cells.get(leaveJailFrom + parseInt(val));
            var result = this.cellBenefit(testCell);
            if (result > 0) {
                resultsPositive += (result * Dice_1.Dice.rollProb[val]);
            }
            else {
                resultsNegative += (result * Dice_1.Dice.rollProb[val]);
            }
        }
        if (resultsPositive > resultsNegative) {
            leaveJail = true;
        }
        return leaveJail;
    };
    Player.prototype.initializeTurn = function () {
        // this.logEntry = new LogEntry(playerID);
        // logEntry.logEvent(START);
    };
    return Player;
}());
exports.Player = Player;
