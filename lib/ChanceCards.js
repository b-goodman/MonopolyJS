"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var cardData = require("./config/cardData.json");
var Card_1 = require("./Card");
var ChanceCards = /** @class */ (function () {
    function ChanceCards() {
        var _this = this;
        //get chance type cards from data and populate CHANCE_CARD_LIB
        var chanceCardData = cardData.filter(function (card) { return card["type"] == "CHANCE"; });
        chanceCardData.map(function (card) { return _this.add(card["cardID"], card["cardContent"], card["actionType"], card["actionPrimary"], card["actionSecondary"]); });
        //init. CHANCE_CARD_DECK
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
    ChanceCards.prototype.add = function (cardID, cardContent, actionType, actionPrimary, actionSecondary) {
        ChanceCards.CHANCE_CARD_LIB.push(new Card_1.Card(cardID, cardContent, actionType, actionPrimary, actionSecondary));
    };
    /**
     * Initialises a new deque by shuffling List CARD_LIB and copying to Deque
     * CARD_DECK
     */
    ChanceCards.prototype.shuffleDeck = function () {
        ChanceCards.CHANCE_CARD_DECK = _.shuffle(ChanceCards.CHANCE_CARD_LIB);
    };
    //
    /**
     * Read the next card without removing it
     *
     * @return [Card] Next Card obj. in deque
     */
    ChanceCards.prototype.getNextCard = function () {
        return ChanceCards.CHANCE_CARD_DECK.shift();
    };
    /**
     * Reads current card (without removal) and returns text content
     *
     * @return [Card] Next Card obj. parsed as list (printable) in deque
     */
    ChanceCards.prototype.readNextCard = function () {
        return _.head(ChanceCards.CHANCE_CARD_DECK);
    };
    /**
     * Returns next card in deck with removal.
     * Init. new deque and returns first card if last card was drawn prev.
     *
     * @return [Card] New random card from deck.
     */
    ChanceCards.prototype.drawCard = function () {
        if (this.getNextCard() == undefined) {
            this.shuffleDeck();
        }
        //Removal of "Get out of jail free cards" from deck
        //on drawing card
        var drawnCard = ChanceCards.CHANCE_CARD_DECK.shift();
        //check if type JAIL with action OUT
        if (drawnCard.actionType == "JAIL" && drawnCard.actionPrimary == "OUT") {
            //if so, remove from CHANCE_CARD_LIB, add to JAIL_BONDS
            ChanceCards.JAIL_BONDS.push(drawnCard);
            ChanceCards.CHANCE_CARD_LIB.splice(_.findIndex(ChanceCards.CHANCE_CARD_LIB, function (card) { return card == drawnCard; }), 1);
        }
        return drawnCard;
    };
    ChanceCards.prototype.reinsertJailBond = function () {
        //Polls form bail holding deque, appends result to current deck.
        ChanceCards.CHANCE_CARD_DECK.push(_.head(ChanceCards.JAIL_BONDS));
    };
    ChanceCards.CHANCE_CARD_LIB = [];
    ChanceCards.CHANCE_CARD_DECK = [];
    ChanceCards.JAIL_BONDS = [];
    return ChanceCards;
}());
exports.ChanceCards = ChanceCards;
