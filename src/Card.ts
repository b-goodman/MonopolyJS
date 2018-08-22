import { ActionType } from "./enums";
import { ActionPrimary } from "./enums";

export class Card {
    //Unique identifier for card
    cardID: number;
    //Textual content of card; what player reads
    cardContent: string;
    //Type of action the card requires
    actionType: ActionType;
    //Details action paramaters
    actionPrimary: ActionPrimary;
    //Details second (if applicable) action paramater
    actionSecondary: any;
    //Constructs default card

    constructor(
            cardID,
            cardContent,
            actionType,
            actionPrimary,
            actionSecondary
    ) {
        this.cardID = cardID;
        this.cardContent = cardContent;
        this.actionType = actionType;
        this.actionPrimary = actionPrimary;
        this.actionSecondary = actionSecondary;
    }

    getCardContent() {
        return this;
    }
}