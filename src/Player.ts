import { GameLog } from './GameLog';
import { ActionType, ActionPrimary } from "./enums";
import { ChestCards } from './ChestCards';
import { ChanceCards } from './ChanceCards';
import * as _ from "lodash";
import { Players } from './Players';
import { Token, CellType, EventType } from "./enums";
import { Card } from "./Card";
// import { LogEntry } from "./LogEntry";
import { Rules } from "./Rules";
import { Cells } from "./Cells";
import { Cell } from "./Cell";
import { Dice } from "./Dice";
import { LogEntry } from "./LogEntry";

export class Player {

    //Player ID
    private _ID: number;

    //Players name
    private _name: string;

    //Design of player's token
    private _token: Token;

    //Player's _position by gameboard location index
    private _position: number;

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
    private _logEntry: LogEntry;

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
        this._position = 1;
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
    public get position(): number {
        return this._position;
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
        return Cells.get(this._position);
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

    // public get logEntry(): LogEntry {
    //     return this._logEntry;
    // }

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
    public set position(new_position: number) {
        this._position = new_position;
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
        this._logEntry = new LogEntry(this.ID);
        this._logEntry.logEvent(EventType.START, null);
    }

    /**
     * Calling this method begins the player's turn.
     */
    public beginTurn() {
        // logEntry.logEvent(PLAYER);
        // player rolls dice and reads value
        let steps: number = Dice.roll();

        if (this.inJail && this.jailTimeSpent < Rules.MAX_JAIL_TERM_VALUE) {
            //Decide if best to leave jail early or take default method (roll dice)
            //Take dice roll expectation - Dice.getExpectationRoll() -

            //Leave jail early:
            //1: use card if avaliable
            if (this._jailBondsAvaliableChance > 0) {
                ChanceCards.reinsertJailBond();
                this._jailBondsAvaliableChance--;
            } else if (this._jailBondsAvaliableChest > 0) {
                ChestCards.reinsertJailBond();
                this._jailBondsAvaliableChest--;
            };

            //2: pay fee (default: 50)
            //Default action: Roll dice.  If doubles, advance token by thown amount.  Do not roll again.
            if (Dice.allEqual) {
                this._logEntry.logEvent(EventType.NOTIFICATION, [this.name + " rolls doubles - [" + Dice.faces.toString() + "] - and gets to leave jail early!"]);
                this.leaveJail();
                this.advanceToken(steps);
            } else {
                //else, take another turn in jail
                this._jailTimeSpent++;
                this._logEntry.logEvent(EventType.NOTIFICATION, [this.name + " fails to roll doubles [" + Dice.faces.toString() + "] and spends another turn in jail (turns until release: " + (Rules.MAX_JAIL_TERM_VALUE - this.jailTimeSpent) + ")"]);
                //endTurn();
            }

            //Player still in jail for maximum duration
        } else if (this.inJail && this.jailTimeSpent == Rules.MAX_JAIL_TERM_VALUE) {
            //Player gets last chance to roll dice
            if (Dice.allEqual) {
                this._logEntry.logEvent(EventType.NOTIFICATION, [this.name + " rolls doubles [" + Dice.faces.toString() + "] and gets to leave jail early!"]);
                this.leaveJail();
                this.advanceToken(steps);
                //if unsucessful, player must pay fine and leave.
            } else {
                this._logEntry.logEvent(EventType.NOTIFICATION, [this.name + " has failed to roll doubles [" + Dice.faces.toString() + "] and has thus served the maximum jail term."]);
                //check if player can afford fine -
                //if(cash>=Rules.getJailLeaveFee()) -- do below
                this._logEntry.logEvent(EventType.NOTIFICATION, [this.name + " pays the fine"]);
                this.playerCashPay(-1, Rules.LEAVE_JAIL_FEE_VALUE);
                this.leaveJail();
                this.advanceToken(steps);
                //else - raise funds >= Rules.getJailLeaveFee()
            }
            //Player is not in jail:
        } else {
            // check if player rolls doubles; if so, and if speeding rule is enabled, increment speed counter
            this._logEntry.logEvent(EventType.ROLL_DICE,[]);
            if (Dice.allEqual) {
                this._speedingCount++;
            }
            // check if players speed counter has reached limit (default 3); if so, send to jail.
            if (this._speedingCount == Rules.DOUBLES_SPEEDING_LIMIT) {
                this._logEntry.logEvent(EventType.NOTIFICATION, [this.name + " sent to jail for speeding"]);
                this.gotoJail();
                // otherwise, proceed with turn
            } else {
                //advance token
                this.advanceToken(steps);
            }
        }
    }

    public midTurn() {
        if (Cells.get(this.position).type == CellType.SPECIAL) {
           let type: string = Cells.get(this.position).actionPrimary;
            let para = Cells.get(this.position).actionSecondary;
            let card: Card = null;
            switch (type) {
                //Draw a card
                case "drawCard":
                    switch (para) {
                        // Draw Chance card
                        case "chance":
                            card = ChanceCards.drawCard();
                            break;
                        //Draw chest card
                        case "chest":
                            card = ChestCards.drawCard();
                            break;
                    }
                    // Actions for post card draw.  Print type of card drawn, parse drawn card action.
                    this.parseCardAction(card);
                    break;
                //Transition to new fixed location
                case "transitionAbs":
                    // The player is being sent to jail (lands on goto jail cell)
                    if (para == "0") {
                        this.gotoJail();
                    } else {
                        // Player has landed on some other transitional cell
                        this.advanceToken(parseInt(para));
                    }
                    break;
                //Recieve money
                case "creditAbs":
                    this.playerCashReceive(-1, parseInt(para));
                    break;
                //Pay money
                case "debitAbs":
                    //If the free parking bonus rule is being enforced
                    if (Rules.FREE_PARKING_BONUS_ENABLED) {
                        //pay the money into the free parking fund
                        Rules.increment__FREE_PARKING_BONUS_VALUE(parseInt(para));
                    } else {
                        //else, pay the bank
                        this.playerCashPay(-1, parseInt(para));
                    }
                    break;
                //Potentially do nothing.  Check rules.
                case "parking":
                    if (Rules.FREE_PARKING_BONUS_ENABLED) {
                        //get current amount of bonus cash
                        //pay amount to player.
                        this.playerCashReceive(-1, Rules.FREE_PARKING_BONUS_VALUE);
                        //Clear bonus - set to 0
                        Rules.clear_FREE_PARKING_BONUS_VALUE;
                    }
                    //else, do nothing.
                    break;
            }
        } else {
            let occupiedCell: Cell = Cells.get(this.position);
            //can cell be owned? if so..
            if (occupiedCell.isOwnable) {
                //is it currently unowned? If so, purchace property
                if (occupiedCell.currentOwner == null) {
                    this.cash -= occupiedCell.baseValue;
                    occupiedCell.setOwnership(this.ID);
                    this._logEntry.logEvent(EventType.PURCHACE, [this._position, occupiedCell.baseValue]);
                    //If it is owned but by the current player, then do nothing
                } else if (occupiedCell.currentOwner == this.ID) {
                    //It is owned and by another player, then pay rent
                } else if (this.get_positionType() == CellType.UTILITY) {
                    this.playerCashPay(occupiedCell.currentOwner, occupiedCell.getCurrentRent());
                } else {
                    this.playerCashPay(occupiedCell.currentOwner, occupiedCell.getCurrentRent());
                }
            }
        }
        if (Dice.allEqual && !this.inJail && !this._exitingJail) {
            this._logEntry.logEvent(EventType.NOTIFICATION, [name + " takes another turn"]);
        }

    }

    // /**
    //  * ends players turn - resets speeding counter
    //  */
    public endTurn() {
        this._logEntry.logEvent(EventType.END,[]);
        this._speedingCount = 0;
        this._exitingJail = false;
        GameLog.logPlayerTurn(this._logEntry);
    }

    /**
     * Move player +- N steps. Rolls over if _position exceeds 40.
     *
     * @param steps [int] Amount of steps player takes. If negative, player will
     * move backwards.
     */
    public advanceToken(steps: number) {
        //advance token
        this.position += steps;
        // get relative (to GO) postion - subtract 40 if abs. positon >40 (i.e., player circumvents the board by passing go)
        if (this.position > Object.keys(Cells.LOCATIONS).length) {
            //Player has circumvented the board
            this.position -= Object.keys(Cells.LOCATIONS).length;
            //has the player passed or landed on GO
            if (this.position != 1) {
                //The player has passed GO
                this._logEntry.logEvent(EventType.NOTIFICATION, [" passes GO"]);
                this.playerCashReceive(-1, Rules.PASS_GO_CREDIT);
            }
        } else if (this.position < 1) {
            this.position += Object.keys(Cells.LOCATIONS).length;
        }
        let positionInfoCost: number = Cells.get(this.position).baseValue;
        let positionInfoOwnership: number = Cells.get(this.position).currentOwner;
        let positionInfocurrentRent: number = Cells.get(this.position).getCurrentRent();

        if (Cells.get(this.position).isOwnable) {
            if (positionInfoOwnership != null) {
                this._logEntry.logEvent(EventType.ADVANCE, [steps, this.position, Players.get(positionInfoOwnership).ID, positionInfocurrentRent]);
            } else {
                this._logEntry.logEvent(EventType.ADVANCE, [steps, this.position, positionInfoCost]);
            }
        } else {
            this._logEntry.logEvent(EventType.ADVANCE, [steps, this.position]);
        }

    }

    public drawChanceCard(): Card {
        let newCard: Card = ChanceCards.drawCard();
        //currentCard = newCard;
        this._logEntry.logEvent(EventType.DRAW_CHANCE,[]);
        return newCard;
    }

    public drawChestCard(): Card {
        let newCard: Card = ChestCards.drawCard();
        //currentCard = newCard;
        this._logEntry.logEvent(EventType.DRAW_CHEST,[]);
        return newCard;
    }

    // /**
    //  * Returns last card drawn by player. Returns null if player has not yet
    //  * drawn a card.
    //  *
    //  * @return [List] Last card drawn by player.
    //  */
    // public List readCurrentCard() {
    //     return currentCard;
    // }

    public parseCardAction(card: Card) {
        let cardType: ActionType  =  card.actionType;
        let cardAction1: ActionPrimary =  card.actionPrimary;
        let cardAction2: any = card.actionSecondary;

        // System.out.println("Parsing Card..");
        switch (cardType) {
            // cases of players transition to fixed, absolute location
            case "TRANSITION_ABS":
                this._position = parseInt(cardAction1);
                //logEntry.logEvent(JUMP, Integer.parseInt(cardAction1));
                this.midTurn();
                return;
            // cases of players transition dependent on current location
            case "TRANSITION_REL":
                switch (cardAction1) {
                    // player advance to next property type (rail, util)
                    case "NEXT":
                        this.position = this.findNextCellType(cardAction2);
                        this._logEntry.logEvent(EventType.JUMP_NEXT, [this.findNextCellType(cardAction2)]);
                        this.midTurn();
                        return;
                    // player advance N spaces from current _position
                    case "GO":
                        this.advanceToken(parseInt(cardAction2));
                        this.midTurn();
                        return;
                }
                return;
            // player recieves jail card
            case "JAIL":
                switch (cardAction1) {
                    case "IN":
                        //player sent to jail
                        this.gotoJail();
                        return;

                    case "OUT":
                        //player gets out of jail free
                        return;
                }
                return;
            // cases of player recieving fixed sum of cash
            case "CREDIT_ABS":
                this.playerCashReceive(-1, parseInt(cardAction1));
                return;
            // cases of player recieving variable ammount of cash dependent on current game params.
            case "CREDIT_REL":
                return;
            // cases of player paying fixed ammount of cash
            case "DEBIT_ABS":
                //If the free parking bonus rule is being enforced
                if (Rules.FREE_PARKING_BONUS_ENABLED) {
                    //pay the money into the free parking fund
                    Rules.increment__FREE_PARKING_BONUS_VALUE(parseInt(cardAction1));
                    this._logEntry.logEvent(EventType.NOTIFICATION, ["pays "+ cardAction1 + " into Free Parking."] );
                    this.playerCashPay(-1, parseInt(cardAction1));
                } else {
                    //else, pay the bank
                    this.playerCashPay(-1, parseInt(cardAction1));
                    this._logEntry.logEvent(EventType.NOTIFICATION, ["pays "+ cardAction1 + " to bank."] );
                }
                return;
            // player paying variable ammount of cash
            case "DEBIT_REL":
                switch (cardAction1) {
                    case "PAY_EACH":
                        //pay each player cardAction2
                        for (let i = 0; i < Players.amount(); i++) {
                            if (this.ID == i) {
                                //do nothing
                            } else {
                                this.playerCashPay(i, parseInt(cardAction2));
                            }
                        }
                    // return;
                }
            //return;
        }
    }

}
