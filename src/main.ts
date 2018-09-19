import * as _ from "lodash";
import { Cells } from './Cells';
import { CellType, Token } from './enums';
import { Dice } from "./Dice";
import { ChanceCards } from "./ChanceCards";
import { ChestCards } from "./ChestCards";
import { Rules } from "./Rules";
import { Cell } from "./Cell";
import { Players } from "./Players";
import { GameLog } from "./GameLog";

import * as cardData from "../config/cardData.json";
import * as cellData from "../config/cellData.json";

new Rules();
new Cells(cellData); 
new Players();
new Dice([6,6]);
new ChanceCards(cardData);
new ChestCards(cardData);
new GameLog(); 

console.log(Object.keys(Cells.LOCATIONS).length);

Players.add("TEST", Token.SHOE);

_.map(Players.PLAYERS,function(value,key){value.initializeTurn()});
_.map(Players.PLAYERS,function(value,key){value.beginTurn()});
_.map(Players.PLAYERS,function(value,key){value.midTurn()});
_.map(Players.PLAYERS,function(value,key){value.endTurn()});

console.log(GameLog.GAME_LOG.map(log=>log.parseLogEntry()));

//$ gulp
//$ node ./dist/bundle.js
