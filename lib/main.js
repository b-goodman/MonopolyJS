"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cells_1 = require("./Cells");
var Dice_1 = require("./Dice");
var ChanceCards_1 = require("./ChanceCards");
var ChestCards_1 = require("./ChestCards");
var Rules_1 = require("./Rules");
var Cell_1 = require("./Cell");
var Players_1 = require("./Players");
var cardData = require("../config/cardData.json");
var cellData = require("../config/cellData.json");
new Rules_1.Rules();
new Cells_1.Cells();
new Players_1.Players();
new Dice_1.Dice([6, 6]);
new ChanceCards_1.ChanceCards(cardData);
new ChestCards_1.ChestCards(cardData);
console.log(cellData[0]);
var cellParam = { type: "SPECIAL", location: 39, name: "Super Tax", color: "Gray", actionPrimary: "debitAbs", actionSecondary: 100 };
var test = new Cell_1.Cell(cellParam);
// Cells.add( { type: <CellType>"RAILROAD", location: 36, name: "King's Cross Station", color: "Gray", baseValue: 200, mortgageValue: 100, rent: [25, 50, 100, 200] } );
// Cells.add({
//     type: <CellType>"PROPERTY",
//     location: 38,
//     name: "Park Lane",
//     color: "Blue",
//     groupID: "H",
//     baseValue: 350,
//     mortgageValue: 175,
//     houseValue: 200,
//     hotelValue: 200,
//     rent: [35, 175, 500, 1100, 1300, 1500]
//   });
// Players.add("TEST", Token.SHOE);
