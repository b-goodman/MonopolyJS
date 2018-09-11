export enum EventType {
    START,
    END,
    PLAYER,
    ADVANCE,
    JUMP,
    JUMP_NEXT,
    INITIAL_LOCATION,
    INTERMEDIATE_LOCATION,
    FINAL_LOCATION,
    ROLL_DICE,
    PURCHACE,
    PAY,
    RECEIVE,
    DRAW_CHEST,
    DRAW_CHANCE,
    NOTIFICATION,
    HOUSE_ADD,
    HOUSE_REMOVE,
    HOTEL_ADD,
    HOTEL_REMOVE
};

export enum CellType {
    PROPERTY = "PROPERTY",
    RAILROAD = "RAILROAD",
    UTILITY = "UTILITY",
    SPECIAL = "SPECIAL",
    JAIL = "JAIL"
};

export enum ActionType {
    TRANSITION_ABS = "TRANSITION_ABS",
    TRANSITION_REL = "TRANSITION_REL",
    DEBIT_ABS = "DEBIT_ABS",
    DEBIT_REL = "DEBIT_REL",
    CREDIT_ABS = "CREDIT_ABS",
    CREDIT_REL = "CREDIT_REL",
    JAIL = "JAIL"
};

export enum ActionPrimary {
    IN = "IN",
    OUT = "OUT",
    NEXT = "NEXT",
    FROM_EACH = "FROM_EACH",
    PAY_EACH = "PAY_EACH",
    REPAIR = "REPAIR",
    GO = "GO"
};

export enum Token {
    WHEELBARROW="WHEELBARROW",
    BATTLESHIP="BATTLESHIP",
    RACECAR="RACECAR",
    THIMBLE="THIMBLE",
    SHOE="SHOE",
    DOG="DOG",
    TOPHAT="TOPHAT",
    CAT="CAT"
}
