"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card = /** @class */ (function () {
    //Constructs default card
    function Card(cardID, cardContent, actionType, actionPrimary, actionSecondary) {
        this.cardID = cardID;
        this.cardContent = cardContent;
        this.actionType = actionType;
        this.actionPrimary = actionPrimary;
        this.actionSecondary = actionSecondary;
    }
    Card.prototype.getCardContent = function () {
        return this;
    };
    return Card;
}());
exports.Card = Card;
