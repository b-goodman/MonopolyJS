import { Dice } from './Dice';
import { Players } from './Players';
import { Card } from './Card';
import { ActionPrimary, EventType } from './enums';
import { Player } from './Player';
import { Cell } from "./Cell";
import { Cells } from "./Cells";
import { GameLog } from "./GameLog"


interface INumberTMap<T> { [key: number]: T; };
interface NumberCellMap extends INumberTMap<Cell> {};
interface NumberPlayerMap extends INumberTMap<Player> {};

class Event {

    //record game state
    private LOCATIONS: NumberCellMap = {};
    private  PLAYERS: NumberPlayerMap = {};
    private  DICE_VALUES: Array<number> = [];
    private  position: number;
    private  PLAYER_ID: number;
    private  EVENT_TYPE: EventType;
    private actionParameters: Array<number> = [];
    private  PLAYER_NAME: string;
    private description: string = null;
    private  logCount: number;
    private  card: Card;
    private cash: number;

    //constructor
    constructor(playerID: number, keyword: EventType, actionParameters: Array<number>) {
        //record game state
        this.LOCATIONS = Cells.LOCATIONS;
        this.PLAYERS = Players.PLAYERS;
        this.DICE_VALUES = Dice.faces;
        this.PLAYER_ID = playerID;
        this.EVENT_TYPE = keyword;
        this.actionParameters = actionParameters;
        this.PLAYER_NAME = Players.get(playerID).name;
        this.position = Players.get(playerID).position;
        if (keyword == EventType.START) {
            GameLog.incLogCounter();
        }
        this.logCount = GameLog.logCounter;
        this.card = (Players.get(playerID).currentCard);
        this.cash = (Players.get(playerID).cash);

    }

    

    //methods
    //verbose parse
    public parse(): string {
        let returnCase: string = null;
        switch (this.EVENT_TYPE) {
            //
            case EventType.START:
                returnCase = this.logCount.toString();
                break;
            case EventType.END:
                returnCase = "ends turn on " + this.LOCATIONS[this.position].name;
                break;
            case EventType.PLAYER:
                returnCase = this.PLAYER_NAME + " begins turn on " + this.LOCATIONS[this.position].name;
                break;
            case EventType.INITIAL_LOCATION:
                //return name of initial location cell
                returnCase = this.LOCATIONS[this.actionParameters[0]].name;
                break;
            case EventType.INTERMEDIATE_LOCATION:
                returnCase = this.LOCATIONS[this.actionParameters[0]].name;
                break;
            case EventType.FINAL_LOCATION:
                returnCase = this.LOCATIONS[this.actionParameters[0]].name;
                break;
            case EventType.ROLL_DICE:
                if (Dice.allEqual) {
                    returnCase = "rolls dice and gets doubles! - " + this.DICE_VALUES;
                } else {
                    returnCase = "rolls dice - " + this.DICE_VALUES;
                }
                break;
            case EventType.ADVANCE:
                let returnAdvance: string;
                switch (this.actionParameters.length) {
                    case 4:
                        returnAdvance = "moves " + this.actionParameters[0] + " steps and lands on " + this.LOCATIONS[this.actionParameters[1]].name + " - Owned by: " + this.PLAYERS[this.actionParameters[2]].name + ", Rent: " + this.actionParameters[3];
                        break;
                    case 3:
                        returnAdvance = "moves " + this.actionParameters[0] + " steps and lands on " + this.LOCATIONS[this.actionParameters[1]].name + " - Avaliable to purchace for " + this.actionParameters[2];
                        break;
                    default:
                        returnAdvance = "moves " + this.actionParameters[0] + " spaces and lands on " + this.LOCATIONS[this.actionParameters[1]].name;
                        break;
                }
                returnCase = returnAdvance;
                break;
            case EventType.JUMP:
                returnCase = "moves to " + this.LOCATIONS[this.actionParameters[0]].name;
                break;
            case EventType.JUMP_NEXT:
                returnCase = "moves to next " + this.LOCATIONS[this.actionParameters[0]].type + " (" + this.LOCATIONS[this.actionParameters[0]].name + ")";
                break;
            case EventType.PURCHACE:
                //propertyID, amount
                returnCase = "purchaces " + this.LOCATIONS[this.actionParameters[0]].name + " for " + this.actionParameters[1];
                break;
            case EventType.HOUSE_ADD:
                //improved location, new rent, houses remaining
                returnCase = "builds house on" + this.LOCATIONS[this.actionParameters[0]].name + " - New Rent: " + this.actionParameters[1] + " - Houses Left: " + this.actionParameters[2];
                break;
            case EventType.HOTEL_ADD:
                //improved location, new rent, hotels remaining
                returnCase = "builds hotel on" + this.LOCATIONS[this.actionParameters[0]].name + " - New Rent: " + this.actionParameters[1] + " - Hotels Left: " + this.actionParameters[2];
                break;

            case EventType.PAY:
                //value, creditor
                let creditor: string;
                let returnCreditor: string;
                switch (this.actionParameters[1]) {
                    case 0:
                        returnCreditor = "BANK";
                        break;
                    case -1:
                        returnCreditor = "FREE PARKING";
                        break;
                    default:
                        returnCreditor = this.PLAYERS[this.actionParameters[1]].name;
                        break;
                }
                creditor = returnCreditor;
                returnCase = "pays " + this.actionParameters[0] + " to " + creditor + " - Bal: " + this.cash;
                break;
            case EventType.RECEIVE:
                //value, debitor
                let debitor: string;
                let returnDebitor: string;
                switch (this.actionParameters[1]) {
                    case 0:
                        returnDebitor = "BANK";
                        break;
                    case -1:
                        returnDebitor = "FREE PARKING";
                        break;
                    default:
                        returnDebitor = this.PLAYERS[this.actionParameters[1]].name;
                        break;
                }
                debitor = returnDebitor;
                returnCase = "is paid " + this.actionParameters[0] + " by " + debitor + " - Bal: " + this.cash;
                break;
            case EventType.DRAW_CHEST:
                returnCase = "draws a COMMUNITY CHEST card: " + this.card.cardContent;
                break;
            case EventType.DRAW_CHANCE:
                returnCase = "draws a CHANCE card: " + this.card.cardContent;
                break;
            case EventType.NOTIFICATION:
                returnCase = this.description;
                break;

        }
        return returnCase;
    }

    public getEventActionKeyword(): EventType{
        return this.EVENT_TYPE;
    }

    public getEventActionParameters(): Array<number>{
        return this.actionParameters;
    }


//    public LogEntry() {
//        //record game state
//        this.PLAYER_OWNERSHIP = Cells.getPlayerOwnership();
//        LOCATIONS = Cells.getLocations();
//    }

}



export class LogEntry {

    //game state
    private LOG_EVENTS: Array<Event> = [];
    public playerID: number;

    constructor(playerID: number) {
        this.playerID = playerID;
    }

    public logEvent( keyword: EventType, actionParameters: Array<any>) {
        this.LOG_EVENTS.push(new Event(this.playerID, keyword, actionParameters));
    }

    public parseLogEntry() {
        return this.LOG_EVENTS.map(event=>event.parse());
    }

}

// public static List parseTurnLogEntry(List logEntry) {
//        List<String> returnList = new ArrayList<>();
//        String playerName = null;
//        String diceTotal = null;
//        String playerPosition = null;
//
//        for (Object line : logEntry) {
//            String splitLine = (String) line;
//            String[] parts = splitLine.split("\\:");
//            switch (parts[0]) {
//                case "START":
//                    switch (parts[1]) {
//                        case "FULL":
//                            //do nothing
//                            break;
//                        case "FORECAST":
//                            returnList.add(" - FORECAST TURN - ");
//                            break;
//                    }
//                    break;
//                case "PLAYER":
//                    playerName = parts[1];
//                    returnList.add("\n" + playerName + " begins turn");
//                    break;
//                case "INITIAL_LOC":
//                    playerPosition = parts[1];
//                    returnList.add("\t" + playerName + " begins on " + Cells.get(Integer.parseInt(parts[1])).getName());
//                    break;
//                case "ROLL_DICE":
//                    diceTotal = parts[1];
//                    returnList.add("\t" + playerName + " rolls " + diceTotal);
//                    break;
//                case "SPEEDING":
//                    returnList.add("\t" + playerName + " rolls doubles! - Doubles rolled this turn: " + parts[1]);
//                    break;
//                case "INTERMEDIATE_LOC":
//                    returnList.add("\t" + playerName + " moves " + diceTotal + " steps and lands on " + Cells.get(Integer.parseInt(parts[1])).getName());
//                    break;
//                case "PURCHACE":
//                    String[] purchace = parts[1].split("\\~");
//                    returnList.add("\t" + playerName + " purchaces " + Cells.get(Integer.parseInt(purchace[0])).getName() + " for " + purchace[1]);
//                    break;
//                case "PAY":
//                    String[] cashPay = parts[1].split("\\->");
//                    returnList.add("\t" + playerName + " pays " + (("BANK".equals(cashPay[1])) ? "BANK" : Players.get(Integer.parseInt(cashPay[1])).getName()) + " " + cashPay[0]);
//                    break;
//                case "CONTINUE":
//                    returnList.add("\t" + playerName + " takes another turn");
//                case "FINAL_LOC":
//                    returnList.add("\t" + playerName + " ends turn on " + parts[1] + "\n");
//                    break;
//
//            }
//        }
//        return returnList;
//    }

