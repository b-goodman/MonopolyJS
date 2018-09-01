import * as _ from "lodash";
import { Players } from './Players';
import { Player } from './Player';
import { Cells } from './Cells';
import { Rules } from './Rules';
import { SpecialCell } from './Cell';
import { CellType } from './enums';

interface IStringTMap<T> { [key: string]: T; };
interface IStringNumberMap extends IStringTMap<number> {};
interface IStringStringMap extends IStringTMap<string> {};

export interface RailroadCell {
    type: CellType,
    location: number,
    name: string,
    color: string,
    baseValue: number,
    mortgageValue: number,
    rent: Array<number>,
    actionPrimary?: any,
    actionSecondary?: any,
    groupID?: string,
    houseValue?: number,
    hotelValue?: number,
    oneUtilityMult?: number,
    twoUtilityMult?: number
  }

export interface SpecialCell {
    type: CellType,
    location: number,
    name: string,
    color: string,
    actionPrimary: any,
    actionSecondary: any,
    baseValue?: number,
    mortgageValue?: number,
    rent?: Array<number>,
    groupID?: string,
    houseValue?: number,
    hotelValue?: number,
    oneUtilityMult?: number,
    twoUtilityMult?: number
}

export interface PropertyCell{
    type: CellType,
    location: number,
    name: string,
    color: string,
    groupID: string,
    baseValue: number,
    mortgageValue: number,
    rent: Array<number>,
    houseValue: number,
    hotelValue: number,
    actionPrimary?: any,
    actionSecondary?: any,
    oneUtilityMult?: number,
    twoUtilityMult?: number
  }
  
  export interface UtilityCell{
    type: CellType,
    location: number,
    name: string,
    color: string,
    baseValue: number,
    mortgageValue: number,
    oneUtilityMult: number,
    twoUtilityMult: number,
    groupID?: string,
    actionPrimary?: string,
    actionSecondary?: string,
    houseValue?: number,
    hotelValue?: number,
    rent?: Array<number>
  }
export class Cell implements SpecialCell, PropertyCell, RailroadCell {

    public type: CellType;
    public location: number;
    public name: string;
    public color: string;

    public isOwnable: boolean = null;

    public groupID: string = null;
    public currentOwner: number = null;
    public baseValue: number = null;
    public mortgageValue: number = null;
    public mortgageState: boolean = null;
    public improvemntState: number = null;

    public static PLAYER_OWNERSHIP: IStringNumberMap = {};
    public static PROPERTY_ID_BY_NAME: IStringStringMap = {};

    public houseValue: number = null;
    public hotelValue: number = null;
    public rent: Array<number> = [];
    public houseCount: number = null;
    public hotelCount: number = null;

    public oneUtilityMult: number = null;
    public twoUtilityMult: number = null;

    public actionPrimary: any = null;
    public actionSecondary: any = null;

    constructor( cell: PropertyCell | SpecialCell | RailroadCell | UtilityCell) {
       
        this.name = cell.name;
        this.location = cell.location;
        this.type = cell.type;
        this.color = cell.color;

        if(this.type == "PROPERTY"){
            this.groupID = cell.groupID;
            Cell.PROPERTY_ID_BY_NAME[cell.name] = 's';
            this.isOwnable = true;
            this.baseValue = cell.baseValue;
            this.mortgageValue = cell.mortgageValue;
            this.rent = cell.rent;
            this.houseValue = cell.houseValue;
            this. hotelValue = cell. hotelValue
        }

        if(this.type == "RAILROAD"){
            this.groupID = 'r';
            Cell.PROPERTY_ID_BY_NAME[cell.name] = 'r';
            this.baseValue = cell.baseValue;
            this.isOwnable = true;
            this.mortgageValue = cell.mortgageValue;
            this.mortgageState = false;
            this.rent = cell.rent;
        };

        if(this.type == "UTILITY"){
            this.groupID = 'u';
            Cell.PROPERTY_ID_BY_NAME[cell.name] = 'u';
            this.baseValue = cell.baseValue;
            this.isOwnable = true;
            this.mortgageValue = cell.mortgageValue;
            this.mortgageState = false;
            this.oneUtilityMult = cell.oneUtilityMult;
            this.twoUtilityMult = cell.twoUtilityMult;
        };

        if(this.type == "SPECIAL"){
            this.groupID = 's';
            Cell.PROPERTY_ID_BY_NAME[cell.name] = 's';
            this.isOwnable = false;
            this.actionPrimary = cell.actionPrimary;
            this.actionSecondary = cell.actionSecondary;
        }

        if(this.type == "JAIL"){
            this.isOwnable = false;
        }
        
    }


// //All cells:
   

//     public int getBaseValue() {
//         return baseValue;
//     }

//     public int getRentBase() {
//         return rentBase;
//     }

//     public int getRent1h() {
//         return rent1H;
//     }

//     public int getRent2h() {
//         return rent2H;
//     }

//     public int getRent3h() {
//         return rent3H;
//     }

//     public int getRent4h() {
//         return rent4H;
//     }

//     public int getRentHotel() {
//         return rentHotel;
//     }

//     public int getHouseValue() {
//         return houseValue;
//     }

//     public int getHotelValue() {
//         return hotelValue;
//     }



// //Ownable cells:

    /**
     * Defines the ownership of this Cell. Sets the Cells ownership field to its
     * new value and adds/overwrites static PLAYER_OWNERSHIP field with Cells
     * name mapped to player ID
     *
     * @param newOwnerID the unique identifier for the owning player
     */
    public setOwnership(newOwnerID: number) {
        var self: any = this;
        this.currentOwner = newOwnerID;
        Cell.PLAYER_OWNERSHIP[this.name] = newOwnerID;
        Cells.CELL_OWNERSHIP[self] = newOwnerID;
    }


    /**
     * Checks if Cell can be (un)mortgaged
     *
     * @param action The mortgage action to be checked for. Either "mortgage" or
     * "unmortgage".
     * @return True if stated action type is valid under current rules and
     * property state. False otherwise
     */
    public isMortgageActionValid(action: string): boolean {
        let returnStatement: boolean = false;
        switch (action) {
            //check if cell can be mortgaged
            case "mortgage":
                //check if cell is ownable; if not then cannot be mortgaged
                if (!this.isOwnable) {
                    console.log("\tThis type of cell (" + this.type + ") is not ownable and so cannot be mortgaged");
                } else if (this.mortgageState) {
                    //Property type is ownable
                    //check if property is already mortgaged; if so then cannot be mortgaged
                    console.log("\tThis property is already mortgaged");
                } else if (this.houseCount > 0 || this.hotelCount == 1) {
                    //Property is ownable and is not currently mortgaged.
                    //Check if property is improved; if so then cannot be mortgaged
                    console.log("\tImproved properties cannot be mortgaged");
                } else {
                    //Property is ownable, unmortgaged and unimproved and thus may be mortgaged
                    returnStatement = true;
                }
                break;
            case "unmortgage":
                //Check if cell is already un-mortgaged
                if (!this.isOwnable) {
                    //If property is not mortgaged then it cannot be unmortgaged.
                    console.log("\tThis property is not mortgaged");
                } else if ( 
                    ( Rules.PROPERTY_MORTGAGE_INTEREST_RATE_ENABLED && Players.get(this.currentOwner).cash < this.mortgageValue + (this.mortgageValue / Rules.PROPERTY_MORTGAGE_INTEREST_RATE_VALUE) 
                    || (!Rules.PROPERTY_MORTGAGE_INTEREST_RATE_ENABLED && Players.get(this.currentOwner).cash < this.mortgageValue)) 
                ){
                    console.log("\tInsufficient funds avaliable to unmortgage this property");
                }
                break;
        }
        return returnStatement;
    }

    /**
     * Mortgages Cell with additional checks
     */
    public mortgageProperty() {
        if (this.isMortgageActionValid("mortgage")) {
            this.mortgageState = true;
            console.log("\t" + Players.get(this.currentOwner).name + " mortgages " + this.name + " for " + this.mortgageValue);
            Players.get(this.currentOwner).playerCashReceive(-1, this.mortgageValue);

        }
    }

    /**
     * Un-mortgages Cell after checking
     */
    public unmortgageProperty() {
        if (this.isMortgageActionValid("unmortgage")) {
            let unmortgageValue: number = (Rules.PROPERTY_MORTGAGE_INTEREST_RATE_ENABLED) ? this.mortgageValue + (this.mortgageValue / Rules.PROPERTY_MORTGAGE_INTEREST_RATE_VALUE) : this.mortgageValue;
            this.mortgageState = false;
            console.log("\t" + Players.get(this.currentOwner).name + " unmortgages " + this.name + " for " + unmortgageValue);
            Players.get(this.currentOwner).playerCashPay(-1, unmortgageValue);
        }
    }

    /**
     * Takes keys of PLAYER_OWNERSHIP which have corresponding values equal to
     * the ID of the player who owns this property.
     *
     * @return List of all properties (including this one) owned by the player
     * who owns this property
     */
    // public getOwningPlayerOwnership() {
    //     // ArrayList<String> returnList;
    //     // returnList = new ArrayList<>();
    //     Cell.PLAYER_OWNERSHIP.filter( (Cell.PLAYER_OWNERSHIP.get(o).equals(this.currentOwner))).forEach((String o) -> {
    //         returnList.add((String) o);
    //     });
    //     return returnList;
    // }

    /**
     * Returns list of group IDs of properties owned by player who owns this
     * Cell
     *
     * @return list of group IDs of properties owned by player who owns this
     * Cell
     */
    // public getOwningPlayerGroupID() {
    //     let returnList;
    //     // returnList = new ArrayList<>();
    //     for (let i = 0; i < getOwningPlayerOwnership().size(); i++) {
    //         returnList.add(getPropertyIDbyName().get((String) getOwningPlayerOwnership().get(i)));
    //     }
    //     return returnList;
    // }
//     //get number of properties owned by player which have same group IDs

//     /**
//      * Returns the amount of properties in this Cells group owned by the player
//      * who owns this Cell
//      *
//      * @return Returns the amount of properties in this Cells group owned by the
//      * player who owns this Cell
//      */
//     public int getOwningPlayerGroupFrequency() {
//         return Collections.frequency(getOwningPlayerGroupID(), getPropertyGroupID());
//     }

//     /**
//      * Returns the number of properties in the group that this Cell is a member
//      * of
//      *
//      * @return Returns the number of properties in the group that this Cell is a
//      * member of
//      */
//     public int getGroupFrequency() {
//         return Collections.frequency(getPropertyIDbyName().values(), getPropertyGroupID());
//     }

    // public getPropertyGroupMembers() {

    //     for (int i = 1; i <= Cells.locationsAmount(); i++) {
    //         if (Cells.get(i).getPropertyGroupID() == groupID) {
    //             groupMembers.add(Cells.get(i));
    //         }
    //     }
    //     return groupMembers;
    // }

    // public memberGroupMortgageCount(): number {
    //     let returnValue:number = 0;
    //     for (Object check : getPropertyGroupMembers()) {
    //         if (((Cell) check).isMortgaged()) {
    //             returnValue++;
    //         }
    //     }
    //     return returnValue;
    // }

    /**
     * Returns current rent for this Cell (property or railroad)
     *
     * @return current rent value
     */
    public getCurrentRent(diceValue?:number): number {
        let returnCase: number = 0;
        if (this.mortgageState) {
            console.log("\tRent cannot be collected on mortgaged properties");
        } else {
            switch (this.type) {
                case "PROPERTY":
                    if (this.hotelCount == 1) {
                        returnCase = _.last(this.rent);
                    } else if (this.houseCount == 0) {
                        //if property is member of a complete set and all set members are unmortgaged and are unimproved,
                        if (isSetComplete() && memberGroupMortgageCount() > 0) {
                            returnCase = _.first(this.rent) * Rules.GROUP_COMPLETION_RENT_BONUS_VALUE;
                        } else {
                            returnCase = _.first(this.rent);
                        }
                    } else {
                        returnCase = this.rent[this.houseCount];
                    }
                    break;
                case "RAILROAD":

                    let validAmount: number = (getOwningPlayerGroupFrequency() - memberGroupMortgageCount())-1;
                    if(validAmount>=0){
                    returnCase = this.rent[validAmount];
                    }else{
                    returnCase = 0;
                    }

                case "UTILITY":
                    switch (getOwningPlayerGroupFrequency()) {
                        case 1:
                            returnCase = (this.oneUtilityMult * diceValue);
                            break;
                        case 2:
                            returnCase = (this.twoUtilityMult * diceValue);
                            break;
                    }
                break;
            }
        }
        return returnCase;
    }


    /**
     * Returns specific rent value based on Cell type (property, railroad,
     * utility) and condition (1 house, 2 houses,...,1 rail, 2 rails... etc )
     *
     * @param field rent condition ("rentBase","rent1H",.., )
     * @return
     */
    public queryCellRent(field) {
        let returnCase: number = 0;
        switch (this.type) {
            case "PROPERTY":
                switch (field) {
                    case "Base":
                        if (isSetComplete()) {
                            returnCase = 2 * this.rentBase;
                            break;
                        } else {
                            returnCase = this.rentBase;
                            break;
                        }
                    //break;
                    case "1H":
                        returnCase = this.rent1H;
                        break;
                    //break;
                    case "2H":
                        returnCase = this.rent2H;
                        break;
                    //break;
                    case "3H":
                        returnCase = this.rent3H;
                        break;
                    //break;
                    case "4H":
                        returnCase = this.rent4H;
                        break;
                    //	break;
                    case "Hotel":
                        returnCase = this.rentHotel;
                    //	break;
                }
                break;
            case "RAILROAD":
                switch (field) {
                    case "Base":
                        returnCase = this.rentBase;
                        break;
                    //break;
                    case "2R":
                        returnCase = this.rent2R;
                        break;
                    //break;
                    case "3R":
                        returnCase = this.rent3R;
                        break;
                    //break;
                    case "4R":
                        returnCase = this.rent4R;
                        break;
                    //break;
                }
                break;
            case "UTILITY":
                switch (getOwningPlayerGroupFrequency()) {
                    case 1:
                        returnCase = this.oneUtilityMult;
                        break;
                    //break;
                    case 2:
                        returnCase = this.twoUtilityMult;
                        break;
                    //break;
                }
                break;
        }
        return returnCase;
    }

// //Property types only:

    /**
     * Checks if property is part of a complete, sole player owned set Used to
     * determine validity for buying improvements and current rent
     *
     * @return True if property is part of complete set, false otherwise
     */
    public boolean isSetComplete() {
        return (getOwningPlayerGroupFrequency() == getGroupFrequency());
    }

    /**
     * Checks if property can support an improvement
     *
     * @return True if rules allow property to be improved, false otherwise
     */
    public addImprovementsValid(): boolean {
        let isValid: boolean = false;
        //Can the player afford improvemens?
        //cost of improvement is a house if houseCount < propertyHotelReq(), else its a hotel.
        let improvementUnitCost: number = (this.houseCount < Rules.PROPERTY_HOTEL_REQ) ? this.houseValue : this.hotelValue;
        //is even build enabled
        //if so, get size of property memebr group, then multiply by cost of improvement
        let improvementNetCost: number = (Rules.PROPERTY_EVEN_BUILD_ENABLED) ? improvementUnitCost * this.getOwningPlayerGroupFrequency() : improvementUnitCost;
        //Check if player owns complete set
        if (!this.isSetComplete()) {
            //Return message is set uncomplete
            console.log("\tCannot improve properties belonging to incomplete sets");
            //check if property is of correct type
        } else if (this.type != <CellType>"PROPERTY") {
            console.log("\tThis cell type (" + this.type + ") cannot be improved");
            //check if property is mortgaged
        } else if (this.mortgageState) {
            // if is mortgaged, throw exception
            console.log("\tCannot improve mortgaged property");
            //otherwise, proceed to check if property improvment limits are reached
        } else if (this.hotelCount == 1) {
            if (Rules.IMPROVEMENT_RESOURCES_FINITE && Rules.PROPERTY_HOTEL_REQ == 0) {
                console.log("\tCannot improve property beyond 1 Hotel (and there are also no hotels avaliable)");
            } else {
                console.log("\tCannot improve property beyond 1 Hotel");
            }
        } else if (Rules.IMPROVEMENT_RESOURCES_FINITE && Rules.IMPROVEMENT_AMOUNT_HOTEL == 0 && this.hotelCount == 0 && this.houseCount < Rules.PROPERTY_HOTEL_REQ) {
            console.log("\tP  roperty eligible for improvement but there are no houses avaliable to purchace");
        } else if (Rules.IMPROVEMENT_RESOURCES_FINITE && Rules.IMPROVEMENT_AMOUNT_HOTEL == 0 && this.hotelCount == 0 && this.houseCount == Rules.PROPERTY_HOTEL_REQ) {
            console.log("\tProperty eligible for improvement but there are no hotels avaliable to purchace");
            //check player has enough cash
        } else if (Players.get(getOwnership()).cash < improvementNetCost) {
            console.log("\t" + Players.get(getOwnership()).name + " cannot afford this improvement (cost: " + improvementNetCost + " - cash: " + Players.get(getOwnership()).getCash() + ")");
        } else {
            isValid = true;
        }
        return isValid;
    }

    /**
     * Adds 1 improvement to property if allowed by rules. Determines next
     * improvement type and updates Cell field (house/hotel count, improvement
     * level) accordingly
     */
    public addImprovement() {
        if (this.addImprovementsValid() && this.houseCount < Rules.PROPERTY_HOTEL_REQ) {
            this.houseCount++;
            if (Rules.IMPROVEMENT_RESOURCES_FINITE) {
                Rules.IMPROVEMENT_AMOUNT_HOUSE --;
            }
            Players.get(this.currentOwner).playerCashPay(-1, this.houseValue);

            console.log("\t" + Players.get(this.currentOwner).name + " builds a house on " + name + " - New Rent: " + this.getCurrentRent() + " - Houses left: " + Rules.IMPROVEMENT_AMOUNT_HOUSE);
            //improvemntState++;
        } else if (this.addImprovementsValid() && this.houseCount == Rules.PROPERTY_HOTEL_REQ) {
            this.houseCount = 0;
            Rules.IMPROVEMENT_AMOUNT_HOUSE += Rules.PROPERTY_HOTEL_REQ;
            this.hotelCount = 1;
            Rules.IMPROVEMENT_AMOUNT_HOTEL--;
            Players.get(this.currentOwner).playerCashPay(-1, this.hotelValue);
            console.log("\t" + Players.get(this.currentOwner).name + " builds a hotel on " + name + " - New Rent: " + this.getCurrentRent());

            this.improvemntState++;
        }
    }

    /**
     * Determines if property can have an improvement (House/Hotel) removed from
     * it
     *
     * @return True if property improvement can be downgraded, False otherwise
     */
    public removeImprovementsValid(): boolean {
        //default return value
        let isValid: boolean = false;
        //is property unimproved
        if ((this.houseCount == 0 && this.hotelCount == 0)) {
            //return message
            console.log("\tCannot remove improvements from unimproved property");
            //else, property has some level of improvement
        } else if (Rules.IMPROVEMENT_RESOURCES_FINITE) {
            //check rules for finite resources - else if resources are infinite then removal will be valid
            //if resources are finte, and the player is selleing a hotel then check that the bank has enough houses to downgrade
            if (this.hotelCount == 1) {
                //determine how many houses are needed.  Is even build enabled?
                if ((Rules.PROPERTY_EVEN_BUILD_ENABLED && (this.getOwningPlayerGroupFrequency() * Rules.PROPERTY_HOTEL_REQ > Rules.IMPROVEMENT_AMOUNT_HOUSE)) || (!Rules.PROPERTY_EVEN_BUILD_ENABLED && Rules.PROPERTY_HOTEL_REQ > Rules.IMPROVEMENT_AMOUNT_HOUSE)) {
                    //removal must be even across all property group members - get the size of membership and multiply by hotelReq
                    console.log("\tInsufficient amount of houses avaliable to downgrade from hotel");
                }
            }
        } else {
            isValid = true;
        }
        return isValid;
    }

    /**
     * Removes 1 improvement from property if allowed by rules
     */
    public removeImprovements() {
        // if action valid
        if (this.removeImprovementsValid()) {
            //and improvement state less than 5 (no hotel) then remove a house
            if (this.hotelCount == 0) {
                //remove house form cell
                this.houseCount--;
                //add house to bank
                Rules.IMPROVEMENT_AMOUNT_HOUSE--;
                //credit owning players acount with resale value (initial sale value divided by penalty amount (default: 2) )
                Players.get(this.currentOwner).playerCashReceive(-1, (this.houseValue / Rules.IMPROVEMENT_RESALE_PENALTY));
                //Otherwise, remove a hotel.
            } else {
                //deduct from cells hotel count
                this.hotelCount = 0;
                //revert cells house count to upper bonud (default: 4)
                this.houseCount = Rules.PROPERTY_HOTEL_REQ;
                //subtract above quantity of houses from game
                Rules.IMPROVEMENT_AMOUNT_HOUSE -= Rules.PROPERTY_HOTEL_REQ;
                //add 1 hotel back into game
                Rules.IMPROVEMENT_AMOUNT_HOTEL++;
                //credit players account with resale value
                Players.get(this.currentOwner).playerCashReceive(-1, (this.hotelValue / Rules.IMPROVEMENT_RESALE_PENALTY));
            }
        }
    }

    }

