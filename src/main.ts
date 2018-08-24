import { Dice } from "./Dice";
import { ChanceCards } from "./ChanceCards";
import { ChestCards } from "./ChestCards";

let dice = new Dice([6,6,6]);

function initCardDecks(cardData){
    new ChanceCards(cardData);
    new ChestCards(cardData);
};

console.log(dice);

