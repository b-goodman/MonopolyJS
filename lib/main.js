"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dice_1 = require("./Dice");
var ChanceCards_1 = require("./ChanceCards");
var dice = new Dice_1.Dice([6, 6, 6]);
var chanceCards = new ChanceCards_1.ChanceCards();
console.log(dice);
console.log(typeof chanceCards.drawCard().actionPrimary);
