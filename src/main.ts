import { Cells } from './Cells';
import { CellType, Token } from './enums';
import { Dice } from "./Dice";
import { ChanceCards } from "./ChanceCards";
import { ChestCards } from "./ChestCards";
import { Rules } from "./Rules";
import { Cell } from "./Cell";
import { Players } from "./Players";

import * as cardData from "../config/cardData.json";
import * as cellData from "../config/cellData.json";

new Rules();
new Cells(); 
new Players();
new Dice([6,6]);
new ChanceCards(cardData);
new ChestCards(cardData);

// console.log(cellData[0]);

// JSON.parse(cellData[0])


(<any>cellData).map(cell => Cells.add(cell));

console.log(Cells.LOCATIONS);

Players.add("TEST", Token.SHOE);
