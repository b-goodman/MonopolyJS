import { Dice } from "./Dice";
import { ChanceCards } from "./ChanceCards";

let dice = new Dice([6,6,6]);
let chanceCards = new ChanceCards();

console.log(dice);

console.log(typeof chanceCards.drawCard().actionPrimary);