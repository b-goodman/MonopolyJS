"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rules = /** @class */ (function () {
    function Rules() {
    }
    Object.defineProperty(Rules, "INITIAL_PLAYER_CASH", {
        //=========================================== METHODS ============================================
        get: function () {
            return Rules._INITIAL_PLAYER_CASH;
        },
        set: function (cash) {
            Rules._INITIAL_PLAYER_CASH = cash;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "LEAVE_JAIL_FEE_VALUE", {
        // ------------------------ JAIL --------------------------------------
        /**
         * Cash player must pay to leave jail via 'Bail' route.
         *
         * @readonly
         * @static
         * @type {number}
         * @memberof Rules
         */
        get: function () {
            return Rules._LEAVE_JAIL_FEE_VALUE;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Rules, "MAX_JAIL_TERM_VALUE", {
        /**
         * Maximum amount of terms player may stay in jail for.
         * On reaching limit, player must move out of jail on beginning of turn.
         *
         * @static
         * @type {number}
         * @memberof Rules
         */
        get: function () {
            return Rules._MAX_JAIL_TERM_VALUE;
        },
        /**
         * Set _MAX_JAIL_TERM_VALUE
         */
        set: function (newTerm) {
            Rules._MAX_JAIL_TERM_VALUE = newTerm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "PROPERTY_MORTGAGE_INTEREST_RATE_ENABLED", {
        /**
         * Get rule enabling mortgage interest.
         *
         * @static
         * @type {boolean}
         * @memberof Rules
         */
        get: function () {
            return Rules._PROPERTY_MORTGAGE_INTEREST_RATE_ENABLED;
        },
        // ------------------ PROPERTY MORTGAGE -----------------------------------
        /**
         * Enable interest on mortgage repayments.
         * Total payment is the property value plus interest rate.
         *
         * @static
         * @memberof Rules
         */
        set: function (enable) {
            Rules._PROPERTY_MORTGAGE_INTEREST_RATE_ENABLED = enable;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Rules, "PROPERTY_MORTGAGE_INTEREST_RATE_VALUE", {
        /**
         * Get the interest rate for property mortgages.
         *
         * @static
         * @type {number}
         * @memberof Rules
         */
        get: function () {
            return Rules._PROPERTY_MORTGAGE_INTEREST_RATE_VALUE;
        },
        /**
         * Set the interest rate for property mortgages.
         *
         * @static
         * @memberof Rules
         */
        set: function (newRate) {
            Rules._PROPERTY_MORTGAGE_INTEREST_RATE_VALUE = newRate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "PROPERTY_EVEN_BUILD_ENABLED", {
        get: function () {
            return Rules._PROPERTY_EVEN_BUILD_ENABLED;
        },
        /**
         * Enable rule requiring that all improvements made to a property must also be made to group members on the same turn.
         *
         * @static
         * @memberof Rules
         */
        set: function (enabled) {
            Rules._PROPERTY_EVEN_BUILD_ENABLED = enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "IMPROVEMENT_RESOURCES_FINITE", {
        /**
         * Get rule enabled status for enforcing a finite amount of property improvements avaliable for purchace during game.
         *
         * @static
         * @type {boolean}
         * @memberof Rules
         */
        get: function () {
            return Rules._IMPROVEMENT_RESOURCES_FINITE;
        },
        /**
         * Set rule enforcing a finite amount of property improvements avaliable for purchace during game.
         *
         * @static
         * @memberof Rules
         */
        set: function (enabled) {
            Rules._IMPROVEMENT_RESOURCES_FINITE = enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "IMPROVEMENT_AMOUNT_HOUSE", {
        /**
         * Get the current amount of avaliable houses for purchace.
         *
         * @static
         * @type {number}
         * @memberof Rules
         */
        get: function () {
            return Rules._IMPROVEMENT_AMOUNT_HOUSE;
        },
        /**
         * Set the current amount of houses avaliable for purchace.
         *
         * @static
         * @memberof Rules
         */
        set: function (newAmount) {
            Rules._IMPROVEMENT_AMOUNT_HOUSE = newAmount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "IMPROVEMENT_AMOUNT_HOTEL", {
        /**
         * Get the current amount of avaliable hotels for purchace.
         *
         * @static
         * @type {number}
         * @memberof Rules
         */
        get: function () {
            return Rules._IMPROVEMENT_AMOUNT_HOTEL;
        },
        /**
         * Set the current amount of avaliable hotels for purchace.
         *
         * @static
         * @memberof Rules
         */
        set: function (newAmount) {
            Rules._IMPROVEMENT_AMOUNT_HOTEL = newAmount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "IMPROVEMENT_RESALE_PENALTY", {
        /**
         * Get the fraction of purchace value a property improvement re-sells for.
         *
         * @static
         * @type {number}
         * @memberof Rules
         */
        get: function () {
            return Rules._IMPROVEMENT_RESALE_PENALTY;
        },
        /**
         * Set the fraction of purchace value a property improvement re-sells for.
         *
         * @static
         * @memberof Rules
         */
        set: function (penaltyValue) {
            Rules._IMPROVEMENT_RESALE_PENALTY = penaltyValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "GROUP_COMPLETION_RENT_BONUS_VALUE", {
        /**
         * Set the rent multiplier for unimproved properties belonging to a group in which al member properties are owned by the same player.
         *
         * @static
         * @type {number}
         * @memberof Rules
         */
        get: function () {
            return Rules._GROUP_COMPLETION_RENT_BONUS_VALUE;
        },
        /**
         * Get the rent multiplier for unimproved properties belonging to a group in which al member properties are owned by the same player.
         *
         * @static
         * @memberof Rules
         */
        set: function (completionBonus) {
            Rules._GROUP_COMPLETION_RENT_BONUS_VALUE = completionBonus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "PROPERTY_HOTEL_REQ", {
        /**
         * Get amount of houses needed on a property before a hotel may be built.
         *
         * @static
         * @type {number}
         * @memberof Rules
         */
        get: function () {
            return Rules._PROPERTY_HOTEL_REQ;
        },
        /**
         * Set amount of houses needed on a property before a hotel may be built.
         *
         * @static
         * @memberof Rules
         */
        set: function (hotelReq) {
            if (hotelReq > 0 && hotelReq <= 4) {
                Rules._PROPERTY_HOTEL_REQ = hotelReq;
            }
            else {
                Rules._PROPERTY_HOTEL_REQ = 4;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "FREE_PARKING_BONUS_ENABLED", {
        /**
         * Checks if the free parking bonus rule should be enforced (default:
         * false).
         *
         * @static
         * @type {boolean}
         * @memberof Rules
         */
        get: function () {
            return Rules._FREE_PARKING_BONUS_ENABLED;
        },
        // -------------------------------- FREE PARKING ----------------------------------
        /**
         * Get enable state for Free Parking bonus rule.
         *
         * @static
         * @memberof Rules
         */
        set: function (setNewValue) {
            Rules._FREE_PARKING_BONUS_ENABLED = setNewValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "FREE_PARKING_BONUS_LIMIT", {
        /**
         * Set the limit on amount of cash stored in Free Parking.  Any additions past the limit will be disregarded.
         * Only applies if FREE_PARKING_BONUS_ENABLE = true
         *
         * @static
         * @memberof Rules
         */
        set: function (bonusLimit) {
            Rules._FREE_PARKING_BONUS_LIMIT = bonusLimit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "FREE_PARKING_BONUS_LIMIT_ENABLED", {
        /**
         * Set a limit on the amount of cash which can be saved in Free Parking.
         *
         * @static
         * @type {boolean}
         * @memberof Rules
         */
        get: function () {
            return Rules._FREE_PARKING_BONUS_LIMIT_ENABLED;
        },
        /**
         * Enables Free Parking bonus.
         * Certain payments will add to this bonus.  The player landing on Free Parking will be granted the bonus.
         *
         * @static
         * @memberof Rules
         */
        set: function (enabled) {
            Rules._FREE_PARKING_BONUS_LIMIT_ENABLED = enabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add cash to the free parking bonus.
     *
     * @static
     * @param {number} incByAmount Value of cash to add
     * @returns
     * @memberof Rules
     */
    Rules.increment__FREE_PARKING_BONUS_VALUE = function (incByAmount) {
        var returnString;
        //Add funds to the free parking bonus
        Rules._FREE_PARKING_BONUS_VALUE += incByAmount;
        //if a limit on the free parking bonus is being enforced and the bonus is equal/greater than than the limit
        if (Rules._FREE_PARKING_BONUS_LIMIT_ENABLED && Rules._FREE_PARKING_BONUS_VALUE >= Rules._FREE_PARKING_BONUS_LIMIT) {
            //reset the bonus to the value of the limit.
            Rules._FREE_PARKING_BONUS_VALUE = Rules._FREE_PARKING_BONUS_LIMIT;
            //Print message - bonus has been reached.
            //System.out.println("\t" + "Free Parking bonus limit has been reached!  (Bal: " + _FREE_PARKING_BONUS_VALUE + ")");
            returnString = "Free Parking bonus limit has been reached!  (Bal: " + Rules._FREE_PARKING_BONUS_VALUE + ")";
        }
        else {
            //Print general message.
            returnString = incByAmount + " is paid into Free Parking (Bal: " + Rules._FREE_PARKING_BONUS_VALUE + ")";
        }
        return returnString;
    };
    /**
     * Reset Free Parking bonus to 0.
     *
     * @static
     * @memberof Rules
     */
    Rules.clear_FREE_PARKING_BONUS_VALUE = function () {
        Rules._FREE_PARKING_BONUS_VALUE = 0;
    };
    Object.defineProperty(Rules, "FREE_PARKING_BONUS_VALUE", {
        get: function () {
            return Rules._FREE_PARKING_BONUS_VALUE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "SPEEDING_ENABLED", {
        /**
         * Checks if the speeding rule should be enforced.
         *
         * @readonly
         * @static
         * @type {boolean}
         * @memberof Rules
         * @return true if the speeding rule should be enforced. false otherwise.
         */
        get: function () {
            return Rules._SPEEDING_ENABLED;
        },
        // ---------------------------------- SPEEDING ------------------------------------
        /**
         *
         *
         * @static
         * @memberof Rules
         * @param speedingEnabledNewValue [boolean] true(false) - enable(disable) speeding rule.
         */
        set: function (speedingEnabledNewValue) {
            Rules._SPEEDING_ENABLED = speedingEnabledNewValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "DOUBLES_SPEEDING_LIMIT", {
        /**
         * Returns the int value of amount of doubles rolled in a single turn
         * required to send the player to jail for 'speeding'.
         *
         * @readonly
         * @static
         * @type {number}
         * @memberof Rules
         * @return [int] amount of doubles rolled in a single turn which sends the
         * player to jail.
         */
        get: function () {
            return Rules._DOUBLES_SPEEDING_LIMIT;
        },
        /**
         * Allows user to override the default amount of doubles rolled in a single
         * turn required to send the player to jail for 'speeding'. Value will have
         * no effect if speeding rule is disabled.
         *
         * @static
         * @memberof Rules
         * @param newSpeedingLimit [int] Player is sent to jail for rolling this
         * many doubles in a single turn (provided that isSpeedingEnabled() == true)
         */
        set: function (newSpeedingLimit) {
            Rules._DOUBLES_SPEEDING_LIMIT = newSpeedingLimit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "PASS_GO_CREDIT", {
        // ---------------------------------- GO -----------------------------------
        /**
         * Canonically, the player receives 200 when passing GO.
         * Used to determine how much a player receives when passing go.
         *
         * @readonly
         * @type {number}
         * @memberof Rules
         * @return [int] The value of cash a player is to receive when passing GO.
         */
        get: function () {
            return Rules._PASS_GO_CREDIT;
        },
        /**
         * The amount of cash received by a player when passing GO.
         *
         * @static
         * @memberof Rules
         * @param creditAmount [int] The value of cash to be given to the player
         * after passing GO.
         */
        set: function (creditAmount) {
            Rules._PASS_GO_CREDIT = creditAmount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "GO_LANDING_BONUS_ENABLED", {
        /**
         * In addition to the normal amount received for passing GO, users may
         * received a bonus if they land on GO. This checks if the rule should be
         * enforced or not.
         *
         * @readonly
         * @static
         * @type {boolean}
         * @memberof Rules
         * @return [boolean] true - the bonus rule should be enforced, false otherwise.
         */
        get: function () {
            return Rules._GO_LANDING_BONUS_ENABLED;
        },
        /**
         * Allows the GO landing bonus rule to be enforced. (default: false)
         *
         * @static
         * @memberof Rules
         * @param isBonusOn [boolean] true - enable. false - disable.
         */
        set: function (isBonusOn) {
            Rules.GO_LANDING_BONUS_ENABLED = isBonusOn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rules, "GO_LANDING_BONUS_VALUE", {
        /**
         *
         * Returns the value of cash to be added to the ordinary sum for passing GO
         * if the player lands on GO.
         *
         * @readonly
         * @static
         * @type {number}
         * @memberof Rules
         * @return the value of cash to be added to the ordinary sum for passing GO
         * if the player lands on GO.
         */
        get: function () {
            return Rules._GO_LANDING_BONUS_VALUE;
        },
        /**
         * Overrides the default landing bonus value (default: 200).
         *
         * @static
         * @memberof Rules
         * @param landingBonus [int] The amount of cash player is to receive in
         * addition to the ordinary sum for passing GO. Note: A negative value for
         * landingBonus will result in a subtraction to the player's ordinary sum.
         */
        set: function (landingBonus) {
            Rules._GO_LANDING_BONUS_VALUE = landingBonus;
        },
        enumerable: true,
        configurable: true
    });
    // ========================== DEFAULT RULES ============================
    // -------------------- INIT -----------------------------
    /**
     * Starting cash for new player
     *
     * @private
     * @static
     * @type {number}
     * @memberof Rules
     */
    Rules._INITIAL_PLAYER_CASH = 2500;
    // --------------------- GO --------------------------
    /**
     * Cash value given to the player after passing 'GO'.
     *
     * @private
     * @static
     * @type {number}
     * @memberof Rules
     */
    Rules._PASS_GO_CREDIT = 200;
    /**
     * Enable rule granting additional cash for landing on 'GO'.
     *
     * @private
     * @static
     * @type {boolean}
     * @memberof Rules
     */
    Rules._GO_LANDING_BONUS_ENABLED = false;
    /**
     * Cash value given to player (in additon to PASS_GO_CREDIT) on landing on 'GO'.
     * Applicable only when GO_LANDING_BONUS_ENABLED = true.
     *
     * @private
     * @static
     * @type {number}
     * @memberof Rules
     */
    Rules._GO_LANDING_BONUS_VALUE = 200;
    // ---------------------- SPEEDING -------------------------------------------
    /**
     * Maximum number of doubles rolled by player allowed per turn.
     * On reaching limit, player is sent to jail.
     * Applicable only when SPEEDING_ENABLED = tue.
     *
     * @private
     * @static
     * @type {number}
     * @memberof Rules
     */
    Rules._DOUBLES_SPEEDING_LIMIT = 3;
    /**
     * Enables rule sending player to jail for rolling n doubles in one turn.
     * Where n = DOUBLES_SPEEDING_LIMIT.
     */
    Rules._SPEEDING_ENABLED = true;
    // ------------------------ FREE PARKING ------------------------------
    /**
     * Enables rule granting the player who lands on 'Free Parking' a cash bonus.
     * Bonus is derived from certain payments made by players during the game.
     *
     * @private
     * @static
     * @type {boolean}
     * @memberof Rules
     */
    Rules._FREE_PARKING_BONUS_ENABLED = false;
    /**
     *Enables limiting of amount of cash that can be stored in 'Free Parking'.
     *
     * @private
     * @static
     * @type {boolean}
     * @memberof Rules
     */
    Rules._FREE_PARKING_BONUS_LIMIT_ENABLED = false;
    /**
     * Assign a limit to the amount of cash which can be stored in free parking.
     *
     * @private
     * @static
     * @type {number}
     * @memberof Rules
     */
    Rules._FREE_PARKING_BONUS_LIMIT = 500;
    /**
     * The current value of cash stored in free parking.
     * Is awarded to player who lands on 'Free Parking'.
     * Only applicable when FREE_PARKING_BONUS_ENABLED = true.
     *
     * @private
     * @static
     * @memberof Rules
     */
    Rules._FREE_PARKING_BONUS_VALUE = 0;
    // ----------- PROPERTY IMPROVEMENTS ------------------------------
    /**
     * Enables a limit set on the amount of property improvements avaliable in the game.
     *
     * @private
     * @static
     * @type {boolean}
     * @memberof Rules
     */
    Rules._IMPROVEMENT_RESOURCES_FINITE = true;
    /**
     * Total number of houses avaliable in game.
     * Default: 32.
     * Applicable when _IMPROVEMENT_RESOURCES_FINITE = true.
     *
     * @private
     * @static
     * @type {number}
     * @memberof Rules
     */
    Rules._IMPROVEMENT_AMOUNT_HOUSE = 32;
    /**
     * Amount of avaliable hotels.
     * Default: 12.
     * Applicable when _IMPROVEMENT_RESOURCES_FINITE = true.
     *
     * @private
     * @static
     * @type {number}
     * @memberof Rules
     */
    Rules._IMPROVEMENT_AMOUNT_HOTEL = 12;
    /**
     * Requires player to build improvements evenly across a property group.
     *
     * @private
     * @static
     * @type {boolean}
     * @memberof Rules
     */
    Rules._PROPERTY_EVEN_BUILD_ENABLED = true;
    /**
     * Amount of houses needed on a property before a hotel may be built.
     *
     * @private
     * @static
     * @type {number}
     * @memberof Rules
     */
    Rules._PROPERTY_HOTEL_REQ = 4;
    Rules._IMPROVEMENT_RESALE_PENALTY = 2;
    Rules._GROUP_COMPLETION_RENT_BONUS_VALUE = 2;
    // -------------------------------- MORTGAGE ---------------------------
    Rules._PROPERTY_MORTGAGE_INTEREST_RATE_ENABLED = true;
    Rules._PROPERTY_MORTGAGE_INTEREST_RATE_VALUE = 10;
    // ------------------------------------ JAIL ------------------------------
    Rules._MAX_JAIL_TERM_VALUE = 3;
    Rules._LEAVE_JAIL_FEE_VALUE = 50;
    return Rules;
}());
exports.Rules = Rules;
