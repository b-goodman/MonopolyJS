import * as _ from "lodash";
import * as cardData from './config/cardData.json';
import { Card } from "./Card";
import { ActionType } from "./enums";
import { ActionPrimary } from "./enums";

export class ChanceCards {

    public static CHANCE_CARD_LIB: Array<Card>  = [];
    private static CHANCE_CARD_DECK: Array<Card> = [];
    private static JAIL_BONDS: Array<Card> = [];

    constructor(){
        //get chance type cards from data and populate CHANCE_CARD_LIB
        let chanceCardData = (<any>cardData).filter(function(card){ return card["type"] == "CHANCE" });
        chanceCardData.map( card => this.add(card["cardID"], card["cardContent"], card["actionType"], card["actionPrimary"], card["actionSecondary"]));
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
    private add(
            cardID: number,
            cardContent: string,
            actionType: ActionType,
            actionPrimary: ActionPrimary,
            actionSecondary: any
    ) {
        ChanceCards.CHANCE_CARD_LIB.push(new Card(cardID, cardContent, actionType, actionPrimary, actionSecondary));
    }

    /**
     * Initialises a new deque by shuffling List CARD_LIB and copying to Deque
     * CARD_DECK
     */
    public shuffleDeck() {
        ChanceCards.CHANCE_CARD_DECK = _.shuffle(ChanceCards.CHANCE_CARD_LIB);
    }

    //
    /**
     * Read the next card without removing it
     *
     * @return [Card] Next Card obj. in deque
     */
    public getNextCard(): Card {
        return ChanceCards.CHANCE_CARD_DECK.shift();
    }

    /**
     * Reads current card (without removal) and returns text content
     *
     * @return [Card] Next Card obj. parsed as list (printable) in deque
     */
    public readNextCard(): Card {
        return _.head(ChanceCards.CHANCE_CARD_DECK);
    }

    /**
     * Returns next card in deck with removal. 
     * Init. new deque and returns first card if last card was drawn prev.
     *
     * @return [Card] New random card from deck.
     */
    public drawCard() {
        if (this.getNextCard() == undefined) {
            this.shuffleDeck();
        }
        //Removal of "Get out of jail free cards" from deck
        //on drawing card
        let drawnCard: Card = ChanceCards.CHANCE_CARD_DECK.shift();
        //check if type JAIL with action OUT
        if (drawnCard.actionType == "JAIL" && drawnCard.actionPrimary == "OUT") {
            //if so, remove from CHANCE_CARD_LIB, add to JAIL_BONDS
            ChanceCards.JAIL_BONDS.push(drawnCard);
            ChanceCards.CHANCE_CARD_LIB.splice(_.findIndex(ChanceCards.CHANCE_CARD_LIB, function(card){ return card == drawnCard }),1);
        }
        return drawnCard;
    }

    public reinsertJailBond() {
        //Polls form bail holding deque, appends result to current deck.
        ChanceCards.CHANCE_CARD_DECK.push(_.head(ChanceCards.JAIL_BONDS));
    }

}

