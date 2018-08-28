import { CellType } from './enums';
import { Dice } from "./Dice";
import { ChanceCards } from "./ChanceCards";
import { ChestCards } from "./ChestCards";
import { Rules } from "./Rules";
import { Cell } from "./Cell";


new Rules();
let dice = new Dice([6,6,6]);

function initCardDecks(cardData){
    new ChanceCards(cardData);
    new ChestCards(cardData);
};

console.log( new Cell( {type: <CellType>"SPECIAL", location:39, name:"Super Tax", color:"Gray", actionPrimary:"debitAbs", actionSecondary:100} ) );

console.log( new Cell( { type: <CellType>"RAILROAD", location: 36, name: "King's Cross Station", color: "Gray", baseValue: 200, mortgageValue: 100, rent: [25, 50, 100, 200] } ) );

console.log( new Cell( {
    type: <CellType>"PROPERTY",
    location: 38,
    name: "Park Lane",
    color: "Blue",
    groupID: "H",
    baseValue: 350,
    mortgageValue: 175,
    houseValue: 200,
    hotelValue: 200,
    rent: [35, 175, 500, 1100, 1300, 1500]
  } ) );