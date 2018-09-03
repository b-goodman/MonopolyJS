"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Card_1 = require("./Card");
var ChestCards = /** @class */ (function () {
    function ChestCards(cardData) {
        var _this = this;
        //get chance type cards from data and populate CHEST_CARD_LIB
        var chestCardData = cardData.filter(function (card) { return card["type"] == "CHANCE"; });
        chestCardData.map(function (card) { return _this.add(card["cardID"], card["cardContent"], card["actionType"], card["actionPrimary"], card["actionSecondary"]); });
        //init. CHANCE_CARD_LIB
        this.shuffleDeck();
    }
    /**
     * Create new Card and add to library
     *
     * @param cardID [String] Unique identifier for card
     * @param cardContent [String] Text viewed by user when reading card
     * @param actionType [String] Defines type of action card performs
     * @param actionPrimary [String] Parameterises action of card
     * @param actionSecondary [String] Provides further instructions of cards
     * action (if applicable)
     */
    ChestCards.prototype.add = function (cardID, cardContent, actionType, actionPrimary, actionSecondary) {
        ChestCards.CHEST_CARD_LIB.push(new Card_1.Card(cardID, cardContent, actionType, actionPrimary, actionSecondary));
    };
    /**
     * Initialises a new deque by shuffling List CARD_LIB and copying to Deque
     * CARD_DECK
     */
    ChestCards.prototype.shuffleDeck = function () {
        ChestCards.CHANCE_CARD_LIB = _.shuffle(ChestCards.CHEST_CARD_LIB);
    };
    //
    /**
     * Read the next card without removing it
     *
     * @return [Card] Next Card obj. in deque
     */
    ChestCards.prototype.getNextCard = function () {
        return ChestCards.CHANCE_CARD_LIB.shift();
    };
    /**
     * Reads current card (without removal) and returns text content
     *
     * @return [Card] Next Card obj. parsed as list (printable) in deque
     */
    ChestCards.prototype.readNextCard = function () {
        return _.head(ChestCards.CHANCE_CARD_LIB);
    };
    /**
     * Returns next card in deck with removal.
     * Init. new deque and returns first card if last card was drawn prev.
     *
     * @return [Card] New random card from deck.
     */
    ChestCards.prototype.drawCard = function () {
        if (this.getNextCard() == undefined) {
            this.shuffleDeck();
        }
        //Removal of "Get out of jail free cards" from deck
        //on drawing card
        var drawnCard = ChestCards.CHANCE_CARD_LIB.shift();
        //check if type JAIL with action OUT
        if (drawnCard.actionType == "JAIL" && drawnCard.actionPrimary == "OUT") {
            //if so, remove from CHEST_CARD_LIB, add to JAIL_BONDS
            ChestCards.JAIL_BONDS.push(drawnCard);
            ChestCards.CHEST_CARD_LIB.splice(_.findIndex(ChestCards.CHEST_CARD_LIB, function (card) { return card == drawnCard; }), 1);
        }
        return drawnCard;
    };
    ChestCards.prototype.reinsertJailBond = function () {
        //Polls form bail holding deque, appends result to current deck.
        ChestCards.CHANCE_CARD_LIB.push(_.head(ChestCards.JAIL_BONDS));
    };
    ChestCards.CHEST_CARD_LIB = [];
    ChestCards.CHANCE_CARD_LIB = [];
    ChestCards.JAIL_BONDS = [];
    return ChestCards;
}());
exports.ChestCards = ChestCards;
