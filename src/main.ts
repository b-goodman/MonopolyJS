import { Dice } from "./Dice";
import { ChanceCards } from "./ChanceCards";
import { ChestCards } from "./ChestCards";
import { Rules } from "./Rules";


new Rules();
let dice = new Dice([6,6,6]);

function initCardDecks(cardData){
    new ChanceCards(cardData);
    new ChestCards(cardData);
};

console.log(Rules.LEAVE_JAIL_FEE_VALUE)

console.log(Rules.MAX_JAIL_TERM_VALUE)




