// import { Cell } from "./Cell";

// public class GameEvent {

//     interface _LOCATIONS {
//         [location: number] : Cell;
//     }

//     //record game state
//     private final Map<Integer, Cell> LOCATIONS;
//     private final Map<Integer, Player> PLAYERS;
//     private final List<Integer> DICE_VALUES;
//     private final int position;
//     private final Integer PLAYER_ID;
//     private final EventType KEYWORD;
//     private int[] actionParameters;
//     private final String PLAYER_NAME;
//     private String description = null;
//     private final int logCount;
//     private final List card;
//     private int cash;

//     //constructor
//     public Event(Integer playerID, EventType keyword, int... actionParameters) {
//         //record game state
//         this.LOCATIONS = Cells.getCells();
//         this.PLAYERS = Players.getPlayers();
//         this.DICE_VALUES = Dice.getFaceValues();
//         this.PLAYER_ID = playerID;
//         this.KEYWORD = keyword;
//         this.actionParameters = actionParameters;
//         this.PLAYER_NAME = PLAYERS.get(playerID).getName();
//         this.position = PLAYERS.get(playerID).getPosition();
//         if (keyword == START) {
//             GameLog.incLogCounter();
//         }
//         this.logCount = GameLog.getLogCounter();
//         this.card = (PLAYERS.get(playerID).readCurrentCard());
//         this.cash = (PLAYERS.get(playerID).getCash());

//     }

//     public Event(Integer playerID, EventType keyword) {
//         //record game state
//         this.LOCATIONS = Cells.getCells();
//         this.PLAYERS = Players.getPlayers();
//         this.DICE_VALUES = Dice.getFaceValues();
//         this.PLAYER_ID = playerID;
//         this.KEYWORD = keyword;
//         this.PLAYER_NAME = PLAYERS.get(playerID).getName();
//         this.position = PLAYERS.get(playerID).getPosition();
//         if (keyword == START) {
//             GameLog.incLogCounter();
//         }
//         this.logCount = GameLog.getLogCounter();
//         this.card = (PLAYERS.get(playerID).readCurrentCard());
//         this.cash = (PLAYERS.get(playerID).getCash());

//     }

//     public Event(Integer playerID, EventType keyword, String description) {
//         //record game state - not working
//         this.LOCATIONS = Cells.getCells();
//         this.PLAYERS = Players.getPlayers();
//         this.DICE_VALUES = Dice.getFaceValues();
//         this.PLAYER_ID = playerID;
//         this.KEYWORD = keyword;
//         this.PLAYER_NAME = PLAYERS.get(playerID).getName();
//         this.position = PLAYERS.get(playerID).getPosition();
//         this.description = description;
//         if (keyword == START) {
//             GameLog.incLogCounter();
//         }
//         this.logCount = GameLog.getLogCounter();
//         this.card = (PLAYERS.get(playerID).readCurrentCard());
//         this.cash = (PLAYERS.get(playerID).getCash());
//     }

//     //methods
//     //verbose parse
//     public String parse() {
//         String returnCase = null;
//         switch (KEYWORD) {
//             //
//             case START:
//                 returnCase = Integer.toString(logCount);
//                 break;
//             case END:
//                 returnCase = "ends turn on " + LOCATIONS.get(position).getName();
//                 break;
//             case PLAYER:
//                 returnCase = PLAYER_NAME + " begins turn on " + LOCATIONS.get(position).getName();
//                 break;
//             case INITIAL_LOCATION:
//                 //return name of initial location cell
//                 returnCase = LOCATIONS.get(actionParameters[0]).getName();
//                 break;
//             case INTERMEDIATE_LOCATION:
//                 returnCase = LOCATIONS.get(actionParameters[0]).getName();
//                 break;
//             case FINAL_LOCATION:
//                 returnCase = LOCATIONS.get(actionParameters[0]).getName();
//                 break;
//             case ROLL_DICE:
//                 if (Dice.isDouble(DICE_VALUES)) {
//                     returnCase = "rolls dice and gets doubles! - " + DICE_VALUES;
//                 } else {
//                     returnCase = "rolls dice - " + DICE_VALUES;
//                 }
//                 break;
//             case ADVANCE:
//                 String returnAdvance;
//                 switch (actionParameters.length) {
//                     case 4:
//                         returnAdvance = "moves " + actionParameters[0] + " steps and lands on " + LOCATIONS.get(actionParameters[1]).getName() + " - Owned by: " + PLAYERS.get(actionParameters[2]).getName() + ", Rent: " + actionParameters[3];
//                         break;
//                     case 3:
//                         returnAdvance = "moves " + actionParameters[0] + " steps and lands on " + LOCATIONS.get(actionParameters[1]).getName() + " - Avaliable to purchace for " + actionParameters[2];
//                         break;
//                     default:
//                         returnAdvance = "moves " + actionParameters[0] + " spaces and lands on " + LOCATIONS.get(actionParameters[1]).getName();
//                         break;
//                 }
//                 returnCase = returnAdvance;
//                 break;
//             case JUMP:
//                 returnCase = "moves to " + LOCATIONS.get(actionParameters[0]).getName();
//                 break;
//             case JUMP_NEXT:
//                 returnCase = "moves to next " + LOCATIONS.get(actionParameters[0]).getCellType() + " (" + LOCATIONS.get(actionParameters[0]).getName() + ")";
//                 break;
//             case PURCHACE:
//                 //propertyID, amount
//                 returnCase = "purchaces " + LOCATIONS.get(actionParameters[0]).getName() + " for " + actionParameters[1];
//                 break;
//             case HOUSE_ADD:
//                 //improved location, new rent, houses remaining
//                 returnCase = "builds house on" + LOCATIONS.get(actionParameters[0]).getName() + " - New Rent: " + actionParameters[1] + " - Houses Left: " + actionParameters[2];
//                 break;
//             case HOTEL_ADD:
//                 //improved location, new rent, hotels remaining
//                 returnCase = "builds hotel on" + LOCATIONS.get(actionParameters[0]).getName() + " - New Rent: " + actionParameters[1] + " - Hotels Left: " + actionParameters[2];
//                 break;

//             case PAY:
//                 //value, creditor
//                 String creditor;
//                 String returnCreditor;
//                 switch (actionParameters[1]) {
//                     case 0:
//                         returnCreditor = "BANK";
//                         break;
//                     case -1:
//                         returnCreditor = "FREE PARKING";
//                         break;
//                     default:
//                         returnCreditor = PLAYERS.get(actionParameters[1]).getName();
//                         break;
//                 }
//                 creditor = returnCreditor;
//                 returnCase = "pays " + actionParameters[0] + " to " + creditor + " - Bal: " + cash;
//                 break;
//             case RECEIVE:
//                 //value, debitor
//                 String debitor;
//                 String returnDebitor;
//                 switch (actionParameters[1]) {
//                     case 0:
//                         returnDebitor = "BANK";
//                         break;
//                     case -1:
//                         returnDebitor = "FREE PARKING";
//                         break;
//                     default:
//                         returnDebitor = PLAYERS.get(actionParameters[1]).getName();
//                         break;
//                 }
//                 debitor = returnDebitor;
//                 returnCase = "is paid " + actionParameters[0] + " by " + debitor + " - Bal: " + cash;
//                 break;
//             case DRAW_CHEST:
//                 returnCase = "draws a COMMUNITY CHEST card: " + card.get(1);
//                 break;
//             case DRAW_CHANCE:
//                 returnCase = "draws a CHANCE card: " + card.get(1);
//                 break;
//             case NOTIFICATION:
//                 returnCase = description;
//                 break;

//         }
//         return returnCase;
//     }

// //        public EventType getEventActionKeyword(){
// //            return keyword;
// //        }
// //
// //        public int[] getEventActionParameters(){
// //            return actionParameters;
// //        }
// }

// //    public LogEntry() {
// //        //record game state
// //        PLAYER_OWNERSHIP = Cells.getPlayerOwnership();
// //        LOCATIONS = Cells.getLocations();
// //    }
// public void logEvent(EventType keyword, int... actionParameters) {
//     LOG_EVENTS.add(new Event(playerID, keyword, actionParameters));
// }

// public void logEvent(EventType keyword) {
//     //Event event = new Event(playerID, keyword);
//     LOG_EVENTS.add(new Event(playerID, keyword));
// }

// public void logEvent(EventType keyword, String description) {
//     //Event event = new Event(playerID, keyword, description);
//     LOG_EVENTS.add(new Event(playerID, keyword, description));
// }

// public void clearTurnLog() {
//     LOG_EVENTS.clear();
// }

// public void submitTurnLog() {
//     GameLog.logPlayerTurn(this);
// }

// public List<Event> getLogEvents() {
//     return LOG_EVENTS;
// }

// public List<String> parseLogEntry() {
//     List<String> returnList = new ArrayList<>();
//     for (Object logElement : LOG_EVENTS) {
//         returnList.add(((Event) logElement).parse());
//     }
//     return returnList;
// }


// public class LogEntry {

//     //game state
//     private LOG_EVENTS: Array<Event> = [];
//     public playerID: number;

//     public LogEntry(playerID: number) {
//         this.playerID = playerID;
//     }

// }

// // public static List parseTurnLogEntry(List logEntry) {
// //        List<String> returnList = new ArrayList<>();
// //        String playerName = null;
// //        String diceTotal = null;
// //        String playerPosition = null;
// //
// //        for (Object line : logEntry) {
// //            String splitLine = (String) line;
// //            String[] parts = splitLine.split("\\:");
// //            switch (parts[0]) {
// //                case "START":
// //                    switch (parts[1]) {
// //                        case "FULL":
// //                            //do nothing
// //                            break;
// //                        case "FORECAST":
// //                            returnList.add(" - FORECAST TURN - ");
// //                            break;
// //                    }
// //                    break;
// //                case "PLAYER":
// //                    playerName = parts[1];
// //                    returnList.add("\n" + playerName + " begins turn");
// //                    break;
// //                case "INITIAL_LOC":
// //                    playerPosition = parts[1];
// //                    returnList.add("\t" + playerName + " begins on " + Cells.get(Integer.parseInt(parts[1])).getName());
// //                    break;
// //                case "ROLL_DICE":
// //                    diceTotal = parts[1];
// //                    returnList.add("\t" + playerName + " rolls " + diceTotal);
// //                    break;
// //                case "SPEEDING":
// //                    returnList.add("\t" + playerName + " rolls doubles! - Doubles rolled this turn: " + parts[1]);
// //                    break;
// //                case "INTERMEDIATE_LOC":
// //                    returnList.add("\t" + playerName + " moves " + diceTotal + " steps and lands on " + Cells.get(Integer.parseInt(parts[1])).getName());
// //                    break;
// //                case "PURCHACE":
// //                    String[] purchace = parts[1].split("\\~");
// //                    returnList.add("\t" + playerName + " purchaces " + Cells.get(Integer.parseInt(purchace[0])).getName() + " for " + purchace[1]);
// //                    break;
// //                case "PAY":
// //                    String[] cashPay = parts[1].split("\\->");
// //                    returnList.add("\t" + playerName + " pays " + (("BANK".equals(cashPay[1])) ? "BANK" : Players.get(Integer.parseInt(cashPay[1])).getName()) + " " + cashPay[0]);
// //                    break;
// //                case "CONTINUE":
// //                    returnList.add("\t" + playerName + " takes another turn");
// //                case "FINAL_LOC":
// //                    returnList.add("\t" + playerName + " ends turn on " + parts[1] + "\n");
// //                    break;
// //
// //            }
// //        }
// //        return returnList;
// //    }

