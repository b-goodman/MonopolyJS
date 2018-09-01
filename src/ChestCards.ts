import * as _ from "lodash";
import { Card } from "./Card";
import { ActionType } from "./enums";
import { ActionPrimary } from "./enums";

export class ChestCards {

    public static CHEST_CARD_LIB: Array<Card>  = [];
    private static CHANCE_CARD_LIB: Array<Card> = [];
    private static JAIL_BONDS: Array<Card> = [];

    constructor(cardData: any){
        //get chance type cards from data and populate CHEST_CARD_LIB
        let chestCardData = (<any>cardData).filter(function(card){ return card["type"] == "CHANCE" });
        chestCardData.map( card => this.add(card["cardID"], card["cardContent"], card["actionType"], card["actionPrimary"], card["actionSecondary"]));
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
    private add(
            cardID: number,
            cardContent: string,
            actionType: ActionType,
            actionPrimary: ActionPrimary,
            actionSecondary: any
    ) {
        ChestCards.CHEST_CARD_LIB.push(new Card(cardID, cardContent, actionType, actionPrimary, actionSecondary));
    }

    /**
     * Initialises a new deque by shuffling List CARD_LIB and copying to Deque
     * CARD_DECK
     */
    public shuffleDeck() {
        ChestCards.CHANCE_CARD_LIB = _.shuffle(ChestCards.CHEST_CARD_LIB);
    }

    //
    /**
     * Read the next card without removing it
     *
     * @return [Card] Next Card obj. in deque
     */
    public getNextCard(): Card {
        return ChestCards.CHANCE_CARD_LIB.shift();
    }

    /**
     * Reads current card (without removal) and returns text content
     *
     * @return [Card] Next Card obj. parsed as list (printable) in deque
     */
    public readNextCard(): Card {
        return _.head(ChestCards.CHANCE_CARD_LIB);
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
        let drawnCard: Card = ChestCards.CHANCE_CARD_LIB.shift();
        //check if type JAIL with action OUT
        if (drawnCard.actionType == "JAIL" && drawnCard.actionPrimary == "OUT") {
            //if so, remove from CHEST_CARD_LIB, add to JAIL_BONDS
            ChestCards.JAIL_BONDS.push(drawnCard);
            ChestCards.CHEST_CARD_LIB.splice(_.findIndex(ChestCards.CHEST_CARD_LIB, function(card){ return card == drawnCard }),1);
        }
        return drawnCard;
    }

    public reinsertJailBond() {
        //Polls form bail holding deque, appends result to current deck.
        ChestCards.CHANCE_CARD_LIB.push(_.head(ChestCards.JAIL_BONDS));
    }

}

