"use strict";
// export enum RuleName {
//     PASS_GO_BONUS_FIELD,
//     ENABLE_GO_LANDING_BONUS,
//     ENABLE_FREE_PARKING_BONUS,
//     ENABLE_BONUS_CAP,
//     ENABLE_FINITE_RESOURCES,
//     HOUSE_AMOUNT_FIELD,
//     HOTEL_AMOUNT_FIELD,
//     ENABLE_EVEN_BUILD,
//     HOTEL_PREREQUISITE_FIELD,
//     IMPROVEMENT_DEPRECIATION_FIELD,
//     SET_COMPLETION_BONUS_FIELD,
//     ENABLE_MORTGAGE_INTEREST,
//     MORTGAGE_INTEREST_RATE_FIELD,
//     ENABLE_SPEEDING,
//     SPEED_LIMIT_FILED,
//     MAX_JAIL_TERM_FIELD,
//     BAIL_FEE_FIELD
// };
Object.defineProperty(exports, "__esModule", { value: true });
var EventType;
(function (EventType) {
    EventType[EventType["START"] = 0] = "START";
    EventType[EventType["END"] = 1] = "END";
    EventType[EventType["PLAYER"] = 2] = "PLAYER";
    EventType[EventType["ADVANCE"] = 3] = "ADVANCE";
    EventType[EventType["JUMP"] = 4] = "JUMP";
    EventType[EventType["JUMP_NEXT"] = 5] = "JUMP_NEXT";
    EventType[EventType["INITIAL_LOCATION"] = 6] = "INITIAL_LOCATION";
    EventType[EventType["INTERMEDIATE_LOCATION"] = 7] = "INTERMEDIATE_LOCATION";
    EventType[EventType["FINAL_LOCATION"] = 8] = "FINAL_LOCATION";
    EventType[EventType["ROLL_DICE"] = 9] = "ROLL_DICE";
    EventType[EventType["PURCHACE"] = 10] = "PURCHACE";
    EventType[EventType["PAY"] = 11] = "PAY";
    EventType[EventType["RECEIVE"] = 12] = "RECEIVE";
    EventType[EventType["DRAW_CHEST"] = 13] = "DRAW_CHEST";
    EventType[EventType["DRAW_CHANCE"] = 14] = "DRAW_CHANCE";
    EventType[EventType["NOTIFICATION"] = 15] = "NOTIFICATION";
    EventType[EventType["HOUSE_ADD"] = 16] = "HOUSE_ADD";
    EventType[EventType["HOUSE_REMOVE"] = 17] = "HOUSE_REMOVE";
    EventType[EventType["HOTEL_ADD"] = 18] = "HOTEL_ADD";
    EventType[EventType["HOTEL_REMOVE"] = 19] = "HOTEL_REMOVE";
})(EventType = exports.EventType || (exports.EventType = {}));
;
var CellType;
(function (CellType) {
    CellType["PROPERTY"] = "PROPERTY";
    CellType["RAILROAD"] = "RAILROAD";
    CellType["UTILITY"] = "UTILITY";
    CellType["SPECIAL"] = "SPECIAL";
    CellType["JAIL"] = "JAIL";
})(CellType = exports.CellType || (exports.CellType = {}));
;
var ActionType;
(function (ActionType) {
    ActionType["TRANSITION_ABS"] = "TRANSITION_ABS";
    ActionType["TRANSITION_REL"] = "TRANSITION_REL";
    ActionType["DEBIT_ABS"] = "DEBIT_ABS";
    ActionType["DEBIT_REL"] = "DEBIT_REL";
    ActionType["CREDIT_ABS"] = "CREDIT_ABS";
    ActionType["CREDIT_REL"] = "CREDIT_REL";
    ActionType["JAIL"] = "JAIL";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
;
var ActionPrimary;
(function (ActionPrimary) {
    ActionPrimary["IN"] = "IN";
    ActionPrimary["OUT"] = "OUT";
    ActionPrimary["NEXT"] = "NEXT";
    ActionPrimary["FROM_EACH"] = "FROM_EACH";
    ActionPrimary["PAY_EACH"] = "PAY_EACH";
    ActionPrimary["REPAIR"] = "REPAIR";
    ActionPrimary["GO"] = "GO";
})(ActionPrimary = exports.ActionPrimary || (exports.ActionPrimary = {}));
;
var Token;
(function (Token) {
    Token["WHEELBARROW"] = "WHEELBARROW";
    Token["BATTLESHIP"] = "BATTLESHIP";
    Token["RACECAR"] = "RACECAR";
    Token["THIMBLE"] = "THIMBLE";
    Token["SHOE"] = "SHOE";
    Token["DOG"] = "DOG";
    Token["TOPHAT"] = "TOPHAT";
    Token["CAT"] = "CAT";
})(Token = exports.Token || (exports.Token = {}));
