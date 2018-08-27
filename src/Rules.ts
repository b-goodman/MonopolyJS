import { NumericDictionary } from "lodash";

export class Rules {
    // ========================== DEFAULT RULES ============================

    // --------------------- GO --------------------------
    /**
     * Cash value given to the player after passing 'GO'.
     *
     * @private
     * @static
     * @type {number}
     * @memberof Rules
     */
    private static _PASS_GO_CREDIT: number = 200;

    /**
     * Enable rule granting additional cash for landing on 'GO'.
     *
     * @private
     * @static
     * @type {boolean}
     * @memberof Rules
     */
    private static _GO_LANDING_BONUS_ENABLED: boolean = false;

    /**
     * Cash value given to player (in additon to PASS_GO_CREDIT) on landing on 'GO'.
     * Applicable only when GO_LANDING_BONUS_ENABLED = true.
     *
     * @private
     * @static
     * @type {number}
     * @memberof Rules
     */
    private static _GO_LANDING_BONUS_VALUE: number = 200;

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
    private static _DOUBLES_SPEEDING_LIMIT:number = 3;

    /**
     * Enables rule sending player to jail for rolling n doubles in one turn.
     * Where n = DOUBLES_SPEEDING_LIMIT.
     */
    private static _SPEEDING_ENABLED: boolean = true;

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
    private static _FREE_PARKING_BONUS_ENABLED: boolean = false;

    /**
     *Enables limiting of amount of cash that can be stored in 'Free Parking'.
     *
     * @private
     * @static
     * @type {boolean}
     * @memberof Rules
     */
    private static _FREE_PARKING_BONUS_LIMIT_ENABLED:boolean = false;

    /**
     * Assign a limit to the amount of cash which can be stored in free parking.
     *
     * @private
     * @static
     * @type {number}
     * @memberof Rules
     */
    private static _FREE_PARKING_BONUS_LIMIT: number = 500;

    /**
     * The current value of cash stored in free parking.
     * Is awarded to player who lands on 'Free Parking'.
     * Only applicable when FREE_PARKING_BONUS_ENABLED = true.
     *
     * @private
     * @static
     * @memberof Rules
     */
    private static _FREE_PARKING_BONUS_VALUE = 0;

    // ----------- PROPERTY IMPROVEMENTS ------------------------------
    /**
     * Enables a limit set on the amount of property improvements avaliable in the game.
     *
     * @private
     * @static
     * @type {boolean}
     * @memberof Rules
     */
    private static _IMPROVEMENT_RESOURCES_FINITE: boolean = true;

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
    private static _IMPROVEMENT_AMOUNT_HOUSE: number = 32;

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
    private static _IMPROVEMENT_AMOUNT_HOTEL: number = 12;

    /**
     * Requires player to build improvements evenly across a property group.
     *
     * @private
     * @static
     * @type {boolean}
     * @memberof Rules
     */
    private static _PROPERTY_EVEN_BUILD_ENABLED: boolean = true;

    /**
     * Amount of houses needed on a property before a hotel may be built.
     *
     * @private
     * @static
     * @type {number}
     * @memberof Rules
     */
    private static _PROPERTY_HOTEL_REQ: number = 4;

    private static _IMPROVEMENT_RESALE_PENALTY: number = 2;

    private static _GROUP_COMPLETION_RENT_BONUS_VALUE:number = 2;

    // -------------------------------- MORTGAGE ---------------------------
    private static _PROPERTY_MORTGAGE_INTEREST_RATE_ENABLED: boolean = true;

    private static _PROPERTY_MORTGAGE_INTEREST_RATE_VALUE: number = 10;

    // ------------------------------------ JAIL ------------------------------
    private static _MAX_JAIL_TERM_VALUE: number = 3;

    private static _LEAVE_JAIL_FEE_VALUE: number = 50;



    //=========================================== METHODS ============================================
    // ------------------------ JAIL --------------------------------------
   /**
    * Cash player must pay to leave jail via 'Bail' route.
    *
    * @readonly
    * @static
    * @type {number}
    * @memberof Rules
    */
   public static get LEAVE_JAIL_FEE_VALUE(): number {
        return Rules._LEAVE_JAIL_FEE_VALUE;
    };

    /**
     * Maximum amount of terms player may stay in jail for.
     * On reaching limit, player must move out of jail on beginning of turn.
     *
     * @static
     * @type {number}
     * @memberof Rules
     */
    public static get MAX_JAIL_TERM_VALUE(): number {
        return Rules._MAX_JAIL_TERM_VALUE;
    }

    /**
     * Set _MAX_JAIL_TERM_VALUE
     */
    public static set MAX_JAIL_TERM_VALUE(newTerm: number) {
        Rules._MAX_JAIL_TERM_VALUE = newTerm;
    }

    // ------------------ PROPERTY MORTGAGE -----------------------------------
    /**
     * Enable interest on mortgage repayments.
     * Total payment is the property value plus interest rate.
     *
     * @static
     * @memberof Rules
     */
    public static set PROPERTY_MORTGAGE_INTEREST_RATE_ENABLED(enable: boolean) {
        Rules._PROPERTY_MORTGAGE_INTEREST_RATE_ENABLED = enable;
    };

    /**
     * Get rule enabling mortgage interest.
     *
     * @static
     * @type {boolean}
     * @memberof Rules
     */
    public static get PROPERTY_MORTGAGE_INTEREST_RATE_ENABLED(): boolean {
        return Rules._PROPERTY_MORTGAGE_INTEREST_RATE_ENABLED;
    }

    /**
     * Set the interest rate for property mortgages.
     *
     * @static
     * @memberof Rules
     */
    public static set PROPERTY_MORTGAGE_INTEREST_RATE_VALUE(newRate: number) {
        Rules._PROPERTY_MORTGAGE_INTEREST_RATE_VALUE = newRate;
    }

    /**
     * Get the interest rate for property mortgages.
     *
     * @static
     * @type {number}
     * @memberof Rules
     */
    public static get PROPERTY_MORTGAGE_INTEREST_RATE_VALUE(): number {
        return Rules._PROPERTY_MORTGAGE_INTEREST_RATE_VALUE;
    }

    public static get PROPERTY_EVEN_BUILD_ENABLED(): boolean {
        return Rules._PROPERTY_EVEN_BUILD_ENABLED;
    }

    /**
     * Get rule enabled status for enforcing a finite amount of property improvements avaliable for purchace during game.
     *
     * @static
     * @type {boolean}
     * @memberof Rules
     */
    public static get IMPROVEMENT_RESOURCES_FINITE(): boolean {
        return Rules._IMPROVEMENT_RESOURCES_FINITE;
    }

    /**
     * Set rule enforcing a finite amount of property improvements avaliable for purchace during game.
     *
     * @static
     * @memberof Rules
     */
    public static set IMPROVEMENT_RESOURCES_FINITE(enabled: boolean) {
        Rules._IMPROVEMENT_RESOURCES_FINITE = enabled;
    }

    /**
     * Get the current amount of avaliable houses for purchace.
     *
     * @static
     * @type {number}
     * @memberof Rules
     */
    public static get IMPROVEMENT_AMOUNT_HOUSE(): number {
        return Rules._IMPROVEMENT_AMOUNT_HOUSE;
    }

    /**
     * Get the current amount of avaliable hotels for purchace.
     *
     * @static
     * @type {number}
     * @memberof Rules
     */
    public static get IMPROVEMENT_AMOUNT_HOTEL(): number {
        return Rules._IMPROVEMENT_AMOUNT_HOTEL;
    }

    /**
     * Set the current amount of avaliable hotels for purchace.
     *
     * @static
     * @memberof Rules
     */
    public static set IMPROVEMENT_AMOUNT_HOTEL(newAmount: number) {
        Rules._IMPROVEMENT_AMOUNT_HOTEL = newAmount;
    }

    /**
     * Set the current amount of houses avaliable for purchace.
     *
     * @static
     * @memberof Rules
     */
    public static set IMPROVEMENT_AMOUNT_HOUSE(newAmount: number) {
        Rules._IMPROVEMENT_AMOUNT_HOUSE = newAmount;
    }

    /**
     * Get the fraction of purchace value a property improvement re-sells for.
     *
     * @static
     * @type {number}
     * @memberof Rules
     */
    public static get IMPROVEMENT_RESALE_PENALTY(): number {
        return Rules._IMPROVEMENT_RESALE_PENALTY;
    }

    /**
     * Set the fraction of purchace value a property improvement re-sells for.
     *
     * @static
     * @memberof Rules
     */
    public static set IMPROVEMENT_RESALE_PENALTY(penaltyValue: number) {
        Rules._IMPROVEMENT_RESALE_PENALTY = penaltyValue;
    }

    /**
     * Set the rent multiplier for unimproved properties belonging to a group in which al member properties are owned by the same player. 
     *
     * @static
     * @type {number}
     * @memberof Rules
     */
    public static get GROUP_COMPLETION_RENT_BONUS_VALUE(): number {
        return Rules._GROUP_COMPLETION_RENT_BONUS_VALUE;
    }

    /**
     * Get the rent multiplier for unimproved properties belonging to a group in which al member properties are owned by the same player. 
     *
     * @static
     * @memberof Rules
     */
    public static set GROUP_COMPLETION_RENT_BONUS_VALUE(completionBonus: number) {
        Rules._GROUP_COMPLETION_RENT_BONUS_VALUE = completionBonus;
    }

    /**
     * Enable rule requiring that all improvements made to a property must also be made to group members on the same turn.
     *
     * @static
     * @memberof Rules
     */
    public static set PROPERTY_EVEN_BUILD_ENABLED(enabled: boolean) {
        Rules._PROPERTY_EVEN_BUILD_ENABLED = enabled;
    }

    /**
     * Set amount of houses needed on a property before a hotel may be built.
     *
     * @static
     * @memberof Rules
     */
    public static set PROPERTY_HOTEL_REQ(hotelReq: number) {
        if (hotelReq > 0 && hotelReq <= 4) {
            Rules._PROPERTY_HOTEL_REQ = hotelReq;
        } else {
            Rules._PROPERTY_HOTEL_REQ = 4;
        }
    }

    /**
     * Get amount of houses needed on a property before a hotel may be built.
     *
     * @static
     * @type {number}
     * @memberof Rules
     */
    public static get PROPERTY_HOTEL_REQ(): number {
        return Rules._PROPERTY_HOTEL_REQ;
    }

    // -------------------------------- FREE PARKING ----------------------------------
    /**
     * Get enable state for Free Parking bonus rule.
     *
     * @static
     * @memberof Rules
     */
    public static set FREE_PARKING_BONUS_ENABLED(setNewValue: boolean) {
        Rules._FREE_PARKING_BONUS_ENABLED = setNewValue;
    }

    /**
     * Checks if the free parking bonus rule should be enforced (default:
     * false).
     *
     * @static
     * @type {boolean}
     * @memberof Rules
     */
    public static get FREE_PARKING_BONUS_ENABLED(): boolean {
        return Rules._FREE_PARKING_BONUS_ENABLED;
    }

    /**
     * Set the limit on amount of cash stored in Free Parking.  Any additions past the limit will be disregarded.
     * Only applies if FREE_PARKING_BONUS_ENABLE = true
     *
     * @static
     * @memberof Rules
     */
    public static set FREE_PARKING_BONUS_LIMIT(bonusLimit: number) {
        Rules._FREE_PARKING_BONUS_LIMIT = bonusLimit;
    }

    /**
     * Enables Free Parking bonus.
     * Certain payments will add to this bonus.  The player landing on Free Parking will be granted the bonus.
     *
     * @static
     * @memberof Rules
     */
    public static set FREE_PARKING_BONUS_LIMIT_ENABLED(enabled: boolean) {
        Rules._FREE_PARKING_BONUS_LIMIT_ENABLED = enabled;
    }

    /**
     * Set a limit on the amount of cash which can be saved in Free Parking.
     *
     * @static
     * @type {boolean}
     * @memberof Rules
     */
    public static get FREE_PARKING_BONUS_LIMIT_ENABLED(): boolean {
        return Rules._FREE_PARKING_BONUS_LIMIT_ENABLED;
    }

    /**
     * Add cash to the free parking bonus.
     *
     * @static
     * @param {number} incByAmount Value of cash to add
     * @returns
     * @memberof Rules
     */
    public static increment__FREE_PARKING_BONUS_VALUE(incByAmount: number) {
        let returnString: string;
        //Add funds to the free parking bonus
        Rules._FREE_PARKING_BONUS_VALUE += incByAmount;
        //if a limit on the free parking bonus is being enforced and the bonus is equal/greater than than the limit
        if (Rules._FREE_PARKING_BONUS_LIMIT_ENABLED && Rules._FREE_PARKING_BONUS_VALUE >= Rules._FREE_PARKING_BONUS_LIMIT) {
            //reset the bonus to the value of the limit.
            Rules._FREE_PARKING_BONUS_VALUE = Rules._FREE_PARKING_BONUS_LIMIT;
            //Print message - bonus has been reached.
            //System.out.println("\t" + "Free Parking bonus limit has been reached!  (Bal: " + _FREE_PARKING_BONUS_VALUE + ")");
            returnString = "Free Parking bonus limit has been reached!  (Bal: " + Rules._FREE_PARKING_BONUS_VALUE + ")";
        } else {
            //Print general message.
            returnString = incByAmount + " is paid into Free Parking (Bal: " + Rules._FREE_PARKING_BONUS_VALUE + ")";
        }
        return returnString;
    }

    /**
     * Reset Free Parking bonus to 0.
     *
     * @static
     * @memberof Rules
     */
    public static clear_FREE_PARKING_BONUS_VALUE() {
        Rules._FREE_PARKING_BONUS_VALUE = 0;
    }

    // ---------------------------------- SPEEDING ------------------------------------
    /**
     *
     *
     * @static
     * @memberof Rules
     * @param speedingEnabledNewValue [boolean] true(false) - enable(disable) speeding rule.
     */
    public static set SPEEDING_ENABLED(speedingEnabledNewValue: boolean) {
        Rules._SPEEDING_ENABLED = speedingEnabledNewValue;
    }

    /**
     * Checks if the speeding rule should be enforced.
     *
     * @readonly
     * @static
     * @type {boolean}
     * @memberof Rules
     * @return true if the speeding rule should be enforced. false otherwise.
     */
    public static get SPEEDING_ENABLED(): boolean {
        return Rules._SPEEDING_ENABLED;
    }

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
    public static set DOUBLES_SPEEDING_LIMIT(newSpeedingLimit: number) {
        Rules._DOUBLES_SPEEDING_LIMIT = newSpeedingLimit;
    }

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
    public static get DOUBLES_SPEEDING_LIMIT(): number {
        return Rules._DOUBLES_SPEEDING_LIMIT;
    }

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
    public static get PASS_GO_CREDIT(): number {
        return Rules._PASS_GO_CREDIT;
    }

    /**
     * The amount of cash received by a player when passing GO.
     *
     * @static
     * @memberof Rules
     * @param creditAmount [int] The value of cash to be given to the player
     * after passing GO.
     */
    public static set PASS_GO_CREDIT(creditAmount: number) {
        Rules._PASS_GO_CREDIT = creditAmount;
    }

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
    public static get GO_LANDING_BONUS_ENABLED(): boolean {
        return Rules._GO_LANDING_BONUS_ENABLED;
    }

    /**
     * Allows the GO landing bonus rule to be enforced. (default: false)
     *
     * @static
     * @memberof Rules
     * @param isBonusOn [boolean] true - enable. false - disable.
     */
    public static set GO_LANDING_BONUS_ENABLED(isBonusOn: boolean) {
        Rules.GO_LANDING_BONUS_ENABLED = isBonusOn;
    }

    /**
     * Overrides the default landing bonus value (default: 200).
     * 
     * @static
     * @memberof Rules
     * @param landingBonus [int] The amount of cash player is to receive in
     * addition to the ordinary sum for passing GO. Note: A negative value for
     * landingBonus will result in a subtraction to the player's ordinary sum.
     */
    public static set GO_LANDING_BONUS_VALUE(landingBonus: number) {
        Rules._GO_LANDING_BONUS_VALUE = landingBonus;
    }

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
    public static get GO_LANDING_BONUS_VALUE(): number {
        return Rules._GO_LANDING_BONUS_VALUE;
    }

}
