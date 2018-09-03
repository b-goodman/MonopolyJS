import * as _ from "lodash";
import { Players } from './Players';
import { Token, CellType } from "./enums";
import { Card } from "./Card";
// import { LogEntry } from "./LogEntry";
import { Rules } from "./Rules";
import { Cells } from "./Cells";
import { Cell } from "./Cell";
import { Dice } from "./Dice";
export class Player {

    //Player ID
    private _ID: number;

    //Players name
    private _name: string;

    //Design of player's token
    private _token: Token;

    //Player's _position by gameboard location index
    private __position: number;

    //Player's avaliable cash
    private _cash: number;

    //Ammount of "get out of jail free" cards avaliable to player
    private _jailBondsAvaliableChance: number;
    private _jailBondsAvaliableChest: number;

    private _exitingJail:boolean;

    //Is player in jail?
    private _inJail: boolean;

    //ammont of consequtive doubles rolled in sinlge turn
    private _speedingCount: number;
    //number of turns spent in jail

    private _jailTimeSpent: number;

    //players currently drawn card
    private _currentCard: Card;

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
    constructor(playerID: number, name: string, token: Token) {
        this._ID = playerID;
        this._name = name;
        this._token = token;
        this.__position = 1;
        this._cash = Rules.INITIAL_PLAYER_CASH;
    }

//Get player's -
    /**
     * Returns the players unique integer identifier
     *
     * @return int - players ID
     */
    public get ID(): number {
        return this._ID;
    }

    /**
     * Returns the players name
     *
     * @return String - player's name
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Returns the players token (enum)
     *
     * @return enum - player's token
     */
    public get token(): Token {
        return this._token;
    }

    /**
     * Returns the _position of the player in terms of its location on the game
     * board/index of LOCATIONS
     *
     * @return LOCATIONS key / board _position
     */
    public get _position(): number {
        return this.__position;
    }

    public set ID(newID: number) {
        this._ID = newID;
    }

    public set name(newName: string) {
        this._name = newName;
    }

    public set token(newToken: Token) {
        this._token = newToken;
    }

    public set cash(newCash: number) {
        this._cash = newCash;
    }

    /**
     * Gets the type of cell which the player is currently occupying
     *
     * @return [string] Cell type currently occupied by player.
     */
    public getCurrentCell(): Cell{
        return Cells.get(this.__position);
    }

    public get_positionType(): CellType {
        return this.getCurrentCell().type;
    }

    public getActionType() {
        return this.getCurrentCell().actionPrimary
    }

    public getActionParamater() {
        return this.getCurrentCell().actionSecondary
    }

    /**
     * Gets name of current _position cell
     *
     * @return
     */
    public get_positionName(): string {
        return this.getCurrentCell().name;
    }

    /**
     * Gets name of specified cell
     *
     * @param cell_position [int] specification for cell. Cells _position on
     * board.
     * @return [String] Name of cell
     */
    public getCellName(cell_position: number): string {
        return Cells.get(cell_position).name;
    }

    /**
     * Return amount of "get out of jail free" card(s) avaliable to the player
     *
     * @return
     */
    public getBondsAvaliable(): number {
        return this._jailBondsAvaliableChance + this._jailBondsAvaliableChest;
    }

    /**
     * Is the player in jail? T/F
     *
     * @return True if player is in jail, False otherwise.
     */
    public get inJail(): boolean {
        return this._inJail;
    }

    public set inJail(newJailState: boolean){
        this._inJail = newJailState;
    }

    /**
     * How many consecutive turns has the player spent in jail
     *
     * @return [int] number of turns spent in current 'in jail' event.
     */
    public get jailTimeSpent(): number {
        return this._jailTimeSpent;
    }

    /**
     * How many doubles has the player rolled so far this turn? Resets to 0 at
     * end of turn.
     *
     * @return [int] amount of doubles rolled on this current turn.
     */
    public get speedingCount(): number {
        return this._speedingCount;
    }

    /**
     * Returns last card drawn by this player
     *
     * @return [List] Card last drawn by player.
     */
    public get currentCard(): Card {
        return this._currentCard;
    }

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
    public set _position(new_position: number) {
        this.__position = new_position;
    };


    /**
     *
     * @param payingPlayerID [0,1,2...] for players.  use -1 for bank
     * @param cashAmount
     */
    public playerCashReceive(payingPlayerID: number, cashAmount: number) {
        if (payingPlayerID >= 0) {
            let payingPlayer: Player = Players.get(payingPlayerID);
            this._cash += cashAmount;
            payingPlayer.cash -= cashAmount;
            // logEntry.logEvent(RECEIVE, cashAmount, payingPlayerID);
        } else {
            this._cash += cashAmount;
            // logEntry.logEvent(RECEIVE, cashAmount, payingPlayerID);
        }
    };

    public playerCashPay(recievingPlayerID: number, cashAmount: number) {
        if (recievingPlayerID >= 0) {
            let recievingPlayer: Player = Players.get(recievingPlayerID);
            this._cash -= cashAmount;
            recievingPlayer.cash += cashAmount;
            // logEntry.logEvent(PAY, cashAmount, recievingPlayerID);
        } else {
            this._cash -= cashAmount;
            // logEntry.logEvent(PAY, cashAmount, recievingPlayerID);
        }
    };

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
    public setOwnership(propertyBoardLocation: number) {
        let cell: Cell = (Cells.get(propertyBoardLocation));
        cell.setOwnership(this._ID);
        Cells.CELL_OWNERSHIP[<any>cell] = this._ID;
    };

    //look through Cells.getPlayerOwnership()
    //return all cells with value == this.playerID
    public getOwnership(): Array<Cell> {
        let result = _.pickBy(Cells.CELL_OWNERSHIP, function(value: number, key) {
            return _.startsWith(<any>value, this._ID);
          });

        return (<any>Object).values(result);
    };

    public getCompleteSets(): {} {
       return _.groupBy( this.getOwnership().filter( cell => cell.isSetComplete() ), function(cell: Cell){
           cell.groupID
       })
    };

    public getPropertyGroupMembers(groupID: string): Array<Cell> {
       return this.getOwnership().filter( cell => cell.groupID == groupID);
    };

    public getCompleteSetID(): Array<string> {
        return _.uniq( Object.keys(this.getCompleteSets()) );
    };

   public addPropertyImprovementByGroup(groupID: string) {
       this.getPropertyGroupMembers(groupID).map( cell => cell.addImprovement() );
   }

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

    public getOwnedPropertyImprovementValue(): number {
        let propertyImprovementValues: Array<any> = this.getOwnership().map( cell => function(cell) {
            if (cell.getHotelCount() == 0) {
                if (cell.getHouseCount() == 0) {
                    //property has no improvements
                    return 0;
                } else {
                    //property has no hotels but >0 houses
                    return (cell.hotelCount * cell.houseValue * ( 1 / Rules.IMPROVEMENT_RESALE_PENALTY));
                }
            } else {
                //property has >0 hotel
                return ((Rules.PROPERTY_HOTEL_REQ * cell.houseValue) + cell.hotelValue) * ( 1 / Rules.IMPROVEMENT_RESALE_PENALTY);
            }
        });
        return propertyImprovementValues.reduce( (a,b) => a+b );
    };

    public getOwnedPropertyBaseValue(): number {
        return this.getOwnership().map( cell => cell.mortgageValue ).reduce( (a,b) => a+b );
    }

    public getOwnedPropertyNetValue(): number {
        return this.getOwnedPropertyBaseValue() + this.getOwnedPropertyImprovementValue();
    }

    public getPlayerNetWorth(): number {
        return this.cash + this.getOwnedPropertyNetValue();
    }

//-------------------------------------------------------

    public mortgageProperty(propertyID: number) {
        Cells.get(propertyID).mortgageProperty();
    }

    public unMortgageProperty(propertyID: number) {
        Cells.get(propertyID).unmortgageProperty();
    }

    /**
     * Returns cells type for specified location
     *
     * @param cellLocation Location of cell on game board
     * @return [String] type of cell ("property","railroad","utility"...)
     */
    public getCellType(cellLocation: number): CellType {
        return Cells.LOCATIONS[cellLocation].type;
    }

    /**
     * Sends the player to jail by setting the players inJail state to True and
     * _positions the player to 0.
     */
    public gotoJail() {
        // this.logEntry.logEvent(JUMP, 0);
        this._inJail = true;
        this._position = 0;
    }

    /**
     * Exits the player from jail; sets inJail state as False, re_positions the
     * player back onto the game board and resets the jail time counter.
     */
    public leaveJail() {
        this._inJail = false;
        this._position = Cells.jailExitLocation;
        this._jailTimeSpent = 0;
        this._exitingJail = true;
        // logEntry.logEvent(NOTIFICATION, "player exits jail");

    }

    public exitingJail(): boolean {
        return this._exitingJail;
    }

    //end set
    /**
     * Returns board location of next specified cell type
     *
     * @param target [String] Type of cell to search for
     * @return [int] Board location of target cell
     */
    public findNextCellType(target: CellType): number {
        var i: number = this._position;
        let search: CellType = this.getCellType(i);
        while (search != target) {
            i++;
            while (i > 40) {
                i -= Object.keys(Cells.LOCATIONS).length -1;
            }
            search = this.getCellType(i);
        }
        return i;
    };

    public cashSignificance(debitValue:number): number {
        let returnValue: number = 0;
        let sig: number = (debitValue / this._cash) * 100;
        if (sig >= 10 && sig < 20) {
            returnValue = 1;
        } else if (sig >= 20 && sig < 40) {
            returnValue = 2;
        } else if (sig > 40) {
            returnValue = 3;
        }
        return returnValue;
    }

    public cellBenefit(testLocation: Cell): number {
        let benefit: number = 0;
        //check if cell is ownable
        if (testLocation.isOwnable) {
            //check if owned
            if (testLocation.isOwnable == null) {
                //is unowned
                benefit += 2;
                //does player already own part of set
                let freq: number = 0;
                let testID: string = testLocation.groupID;

                this.getOwnership().filter( cell => cell.groupID == testID)

                
                //if so, inc. benefit
                if (freq > 0) {
                    benefit++;
                    //and does the property complete a set
                    if (freq == testLocation.getGroupFrequency() - 1) {
                        benefit++;
                    }
                }
            } else {
                //property is onwed, get rent
                //is type UTILITY
                let testRent: number = testLocation.getCurrentRent();
                //is the rent significant
                benefit -= this.cashSignificance(testRent);
            }
        } else {
            switch (testLocation.actionPrimary) {
                case "drawCard":
                    if ("chest" == testLocation.actionSecondary) {
                        //assume chest to have good outcome
                        benefit++;
                    } else {
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
                    if (Rules.FREE_PARKING_BONUS_ENABLED) {
                        benefit += this.cashSignificance(Rules.FREE_PARKING_BONUS_VALUE);
                    }
                    break;
                case "transitionAbs":
                    if ("0" == testLocation.actionSecondary) {
                        benefit--;
                    } else {
                        benefit = this.cellBenefit(testLocation.actionSecondary);
                    }
                    break;
                case "transitionRel":
                    let newLocation: number = testLocation.location + testLocation.actionSecondary;
                    let newCell: Cell = Cells.get(newLocation);
                    benefit = this.cellBenefit(newCell);
                    break;
            }
        }
        return benefit;
    }

    public leaveJailEarly(): boolean {
        let leaveJail: boolean = false;
        let leaveJailFrom: number = Cells.jailExitLocation;
        let resultsPositive: number = 0;
        let resultsNegative: number = 0;

        let roll: Array<string> = Object.keys(Dice.rollProb);

        for (let val in roll) {
            let testCell: Cell = Cells.get(leaveJailFrom + parseInt(val));
            let result: number = this.cellBenefit(testCell);
            if (result > 0) {
                resultsPositive += (result * Dice.rollProb[val]);
            } else {
                resultsNegative += (result * Dice.rollProb[val]);
            }
        }
        if (resultsPositive > resultsNegative) {
            leaveJail = true;
        }
        return leaveJail;
    }

    public initializeTurn() {
        // this.logEntry = new LogEntry(playerID);
        // logEntry.logEvent(START);
    }

    /**
     * Calling this method begins the player's turn.
     */
    // public beginTurn() {
    //     // logEntry.logEvent(PLAYER);
    //     // player rolls dice and reads value
    //     let steps: number = Dice.roll();

    //     if (this.inJail && this.jailTimeSpent < Rules.MAX_JAIL_TERM_VALUE) {
    //         //Decide if best to leave jail early or take default method (roll dice)
    //         //Take dice roll expectation - Dice.getExpectationRoll() -

    //         //Leave jail early:
    //         //1: use card if avaliable
    //         //            if (jailBondsAvaliableChance > 0) {
    //         //                ChanceCards.reinsertJailBond();
    //         //                jailBondsAvaliableChance--;
    //         //            } else if (jailBondsAvaliableChest > 0) {
    //         //                ChestCards.reinsertJailBond();
    //         //                jailBondsAvaliableChest--;
    //         //            }
    //         //2: pay fee (default: 50)
    //         //Default action: Roll dice.  If doubles, advance token by thown amount.  Do not roll again.
    //         if (Dice.isDouble(Dice.getFaceValues())) {
    //             logEntry.logEvent(NOTIFICATION, name + " rolls doubles " + Dice.getFaceValues() + " and gets to leave jail early!");
    //             leaveJail();
    //             advanceToken(steps);
    //         } else {
    //             //else, take another turn in jail
    //             jailTimeSpent++;
    //             logEntry.logEvent(NOTIFICATION, name + " fails to roll doubles " + Dice.getFaceValues() + " and spends another turn in jail (turns until release: " + (Rules.getMaxJailTerm() - jailTimeSpent) + ")");
    //             //endTurn();
    //         }
    //         //Player still in jail for maximum duration
    //     } else if (isInJail() && jailTimeSpent == Rules.getMaxJailTerm()) {
    //         //Player gets last chance to roll dice
    //         if (Dice.isDouble(Dice.getFaceValues())) {
    //             logEntry.logEvent(NOTIFICATION, name + " rolls doubles " + Dice.getFaceValues() + " and gets to leave jail early!");
    //             leaveJail();
    //             advanceToken(steps);
    //             //if unsucessful, player must pay fine and leave.
    //         } else {
    //             logEntry.logEvent(NOTIFICATION, name + " has failed to roll doubles " + Dice.getFaceValues() + " and has thus served the maximum jail term.");
    //             //check if player can afford fine -
    //             //if(cash>=Rules.getJailLeaveFee()) -- do below
    //             logEntry.logEvent(NOTIFICATION, name + " pays the fine");
    //             playerCashPay(-1, Rules.getJailLeaveFee());
    //             leaveJail();
    //             advanceToken(steps);
    //             //else - raise funds >= Rules.getJailLeaveFee()
    //         }
    //         //Player is not in jail:
    //     } else {
    //         // check if player rolls doubles; if so, and if speeding rule is enabled, increment speed counter
    //         logEntry.logEvent(ROLL_DICE);
    //         if (Dice.isDouble(Dice.getFaceValues())) {
    //             speedingCount++;
    //         }
    //         // check if players speed counter has reached limit (default 3); if so, send to jail.
    //         if (speedingCount == Rules.getDoublesSpeedingLimit()) {
    //             logEntry.logEvent(NOTIFICATION, name + " sent to jail for speeding");
    //             gotoJail();
    //             // otherwise, proceed with turn
    //         } else {
    //             //advance token
    //             advanceToken(steps);
    //         }
    //     }
    // }

    // public void midTurn() {
    //     if (get_positionType() == SPECIAL) {
    //         String type = getActionType();
    //         String para = getActionParamater();
    //         switch (type) {
    //             //Draw a card
    //             case "drawCard":
    //                 switch (para) {
    //                     // Draw Chance card
    //                     case "chance":
    //                         drawChanceCard();
    //                         break;
    //                     //Draw chest card
    //                     case "chest":
    //                         drawChestCard();
    //                         break;
    //                 }
    //                 // Actions for post card draw.  Print type of card drawn, parse drawn card action.
    //                 parseCardAction(readCurrentCard());
    //                 break;
    //             //Transition to new fixed location
    //             case "transitionAbs":
    //                 // The player is being sent to jail (lands on goto jail cell)
    //                 if ("0".equals(para)) {
    //                     gotoJail();
    //                 } else {
    //                     // Player has landed on some other transitional cell
    //                     advanceToken(Integer.parseInt(para));
    //                 }
    //                 break;
    //             //Recieve money
    //             case "creditAbs":
    //                 playerCashRecieve(-1, Integer.parseInt(para));
    //                 break;
    //             //Pay money
    //             case "debitAbs":
    //                 //If the free parking bonus rule is being enforced
    //                 if (Rules.isFreeParkingBonusEnabled()) {
    //                     //pay the money into the free parking fund
    //                     Rules.incFreeParkingBonusValue(Integer.parseInt(para));
    //                 } else {
    //                     //else, pay the bank
    //                     playerCashPay(-1, Integer.parseInt(para));
    //                 }
    //                 break;
    //             //Potentially do nothing.  Check rules.
    //             case "parking":
    //                 if (Rules.isFreeParkingBonusEnabled()) {
    //                     //get current amount of bonus cash
    //                     //pay amount to player.
    //                     playerCashRecieve(-1, Rules.getFreeParkingBonusValue());
    //                     //Clear bonus - set to 0
    //                     Rules.clearFreeParkingBonus();
    //                 }
    //                 //else, do nothing.
    //                 break;
    //         }
    //     } else {
    //         Cell occupiedCell = Cells.get((Integer) get_position());
    //         //can cell be owned? if so..
    //         if (occupiedCell.getOwnable()) {
    //             //is it currently unowned? If so, purchace property
    //             if (occupiedCell.getOwnership() == null) {
    //                 cash -= occupiedCell.getBaseValue();
    //                 occupiedCell.setOwnership(getPlayerID());
    //                 logEntry.logEvent(PURCHACE, _position, occupiedCell.getBaseValue());
    //                 //If it is owned but by the current player, then do nothing
    //             } else if (Objects.equals(occupiedCell.getOwnership(), getPlayerID())) {
    //                 //It is owned and by another player, then pay rent
    //             } else if (get_positionType() == UTILITY) {
    //                 playerCashPay(occupiedCell.getOwnership(), occupiedCell.getRent(Dice.getRollSum()));
    //             } else {
    //                 playerCashPay(occupiedCell.getOwnership(), occupiedCell.getRent());
    //             }
    //         }
    //     }
    //     if (Dice.isDouble(Dice.getFaceValues()) && !isInJail() && !isPlayerExitingJail()) {
    //         logEntry.logEvent(NOTIFICATION, name + " takes another turn");
    //     }

    // }

    // /**
    //  * ends players turn - resets speeding counter
    //  */
    // public void endTurn() {
    //     logEntry.logEvent(END);
    //     speedingCount = 0;
    //     exitingJail = false;
    //     GameLog.logPlayerTurn(logEntry);
    // }

    // /**
    //  * Move player +- N steps. Rolls over if _position exceeds 40.
    //  *
    //  * @param steps [int] Amount of steps player takes. If negative, player will
    //  * move backwards.
    //  */
    // public void advanceToken(int steps) {
    //     //advance token
    //     _position += steps;
    //     // get relative (to GO) postion - subtract 40 if abs. positon >40 (i.e., player circumvents the board by passing go)
    //     if (_position > Cells.locationsAmount()) {
    //         //Player has circumvented the board
    //         _position -= Cells.locationsAmount();
    //         //has the player passed or landed on GO
    //         if (_position != 1) {
    //             //The player has passed GO
    //             logEntry.logEvent(NOTIFICATION, " passes GO");
    //             playerCashRecieve(-1, Rules.getPassGoCredit());
    //         }
    //     } else if (_position < 1) {
    //         _position += Cells.locationsAmount();
    //     }
    //     int positionInfoCost = Cells.get(_position).getBaseValue();
    //     Integer _positionInfoOwnership = Cells.get(_position).getOwnership();
    //     int _positionInfocurrentRent = (get_positionType() == UTILITY) ? (Cells.get(_position)).getRent(Dice.getRollSum()) : Cells.get(_position).getRent();

    //     if (Cells.get(_position).getOwnable()) {
    //         if (_positionInfoOwnership != null) {
    //             logEntry.logEvent(ADVANCE, steps, _position, Players.get(_positionInfoOwnership).getPlayerID(), _positionInfocurrentRent);
    //         } else {
    //             logEntry.logEvent(ADVANCE, steps, _position, _positionInfoCost);
    //         }
    //     } else {
    //         logEntry.logEvent(ADVANCE, steps, _position);
    //     }

    // }

    // public List drawChanceCard() {
    //     List newCard = ChanceCards.drawCard();
    //     currentCard = newCard;
    //     logEntry.logEvent(DRAW_CHANCE);
    //     return newCard;
    // }

    // public List drawChestCard() {
    //     List newCard = ChestCards.drawCard();
    //     currentCard = newCard;
    //     logEntry.logEvent(DRAW_CHEST);
    //     return newCard;
    // }

    // /**
    //  * Returns last card drawn by player. Returns null if player has not yet
    //  * drawn a card.
    //  *
    //  * @return [List] Last card drawn by player.
    //  */
    // public List readCurrentCard() {
    //     return currentCard;
    // }

    // public void parseCardAction(List card) {
    //     String cardType = (String) card.get(2);
    //     String cardAction1 = (String) card.get(3);
    //     String cardAction2 = (String) card.get(4);

    //     // System.out.println("Parsing Card..");
    //     switch (cardType) {
    //         // cases of players transition to fixed, absolute location
    //         case "TRANSITION_ABS":
    //             _position = Integer.parseInt(cardAction1);
    //             logEntry.logEvent(JUMP, Integer.parseInt(cardAction1));
    //             midTurn();
    //             return;
    //         // cases of players transition dependent on current location
    //         case "TRANSITION_REL":
    //             switch (cardAction1) {
    //                 // player advance to next property type (rail, util)
    //                 case "NEXT":
    //                     _position = findNextCellType(cardAction2);
    //                     logEntry.logEvent(JUMP_NEXT, findNextCellType(cardAction2));
    //                     midTurn();
    //                     return;
    //                 // player advance N spaces from current _position
    //                 case "GO":
    //                     advanceToken(Integer.parseInt(cardAction2));
    //                     midTurn();
    //                     return;
    //             }
    //             return;
    //         // player recieves jail card
    //         case "JAIL":
    //             switch (cardAction1) {
    //                 case "IN":
    //                     //player sent to jail
    //                     gotoJail();
    //                     return;

    //                 case "OUT":
    //                     //player gets out of jail free
    //                     return;
    //             }
    //             return;
    //         // cases of player recieving fixed sum of cash
    //         case "CREDIT_ABS":
    //             playerCashRecieve(-1, Integer.parseInt(cardAction1));
    //             return;
    //         // cases of player recieving variable ammount of cash dependent on current game params.
    //         case "CREDIT_REL":
    //             return;
    //         // cases of player paying fixed ammount of cash
    //         case "DEBIT_ABS":
    //             //If the free parking bonus rule is being enforced
    //             if (Rules.isFreeParkingBonusEnabled()) {
    //                 //pay the money into the free parking fund
    //                 logEntry.logEvent(NOTIFICATION, Rules.incFreeParkingBonusValue(Integer.parseInt(cardAction1)));
    //                 playerCashPay(-1, Integer.parseInt(cardAction1));
    //             } else {
    //                 //else, pay the bank
    //                 playerCashPay(-1, Integer.parseInt(cardAction1));
    //             }
    //             return;
    //         // player paying variable ammount of cash
    //         case "DEBIT_REL":
    //             switch (cardAction1) {
    //                 case "PAY_EACH":
    //                     //pay each player cardAction2
    //                     for (Integer i = 0; i < Players.amount(); i++) {
    //                         if (Objects.equals(i, playerID)) {
    //                             //do nothing
    //                         } else {
    //                             playerCashPay(i, Integer.parseInt(cardAction2));
    //                         }
    //                     }
    //                 // return;
    //             }
    //         //return;
    //     }
    // }

}
