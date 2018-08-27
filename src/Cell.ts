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
    actionPrimary?: string,
    actionSecondary?: string
  }

export interface SpecialCell {
    type: CellType,
    location: number,
    name: string,
    color: string,
    actionPrimary: string,
    actionSecondary: any,
    baseValue?: number,
    mortgageValue?: number,
    rent?: Array<number>
}

export class Cell implements SpecialCell {

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
    public rentBase: number = null;
    public rent1H: number = null;
    public rent2H: number = null;
    public rent3H: number = null;
    public rent4H: number = null;
    public rentHotel: number = null;
    public houseCount: number = null;
    public hotelCount: number = null;

    public oneUtilityMult: number = null;
    public twoUtilityMult: number = null;

    public actionPrimary: string = null;
    public actionSecondary: string = null;

    public railroadRentConditions: Array<number> | null  = null;

    constructor( 
        // type: CellType,
        // location: number,
        // name: string,
        // color: string,

        // groupID?: string,
        // baseValue?: number,
        // mortgageValue?: number,
        // houseValue?: number,
        // hotelValue?: number,
        // rentBase?: number,
        // rent1H?: number,
        // rent2H?: number,
        // rent3H?: number,
        // rent4H?: number,
        // rentHotel?: number,

        // rent1R?: number,
        // rent2R?: number,
        // rent3R?: number,
        // rent4R?: number,

        // oneUtilityMult?: number,
        // twoUtilityMult?: number,
        // actionPrimary?: string,
        // actionSecondary?: string
        cell:SpecialCell|RailroadCell
 
    ) {
        this.name = cell.name;
        this.location = cell.location;
        this.type = cell.type;
        this.color = cell.color;

        // if(this.type == "PROPERTY"){
        //     this.baseValue = baseValue;
        //     this.isOwnable = true;
        //     this.improvemntState = 0;
        //     this.houseValue = houseValue;
        //     this.hotelValue = hotelValue;
        //     this.rentBase = rentBase;
        //     this.rent1H = rent1H;
        //     this.rent2H = rent2H;
        //     this.rent3H = rent3H;
        //     this.rent4H = rent4H;
        //     this.rentHotel = rentHotel;
        //     this.houseCount = 0;
        //     this.hotelCount = 0;
        //     this.mortgageValue = mortgageValue;
        //     this.mortgageState = false;
        // };

        if(this.type == "RAILROAD"){
            this.baseValue = cell.baseValue;
            this.isOwnable = true;
            this.mortgageValue = cell.mortgageValue;
            this.mortgageState = false;
            this.railroadRentConditions = cell.rent;
        };

        // if(this.type == "UTILITY"){
        //     this.baseValue = baseValue;
        //     this.isOwnable = true;
        //     this.mortgageValue = mortgageValue;
        //     this.mortgageState = false;
        //     this.oneUtilityMult = oneUtilityMult;
        //     this.twoUtilityMult = twoUtilityMult;
        // };

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

        // newSpecialCell(cell:SpecialCell):Cell{
        //     return new Cell(cell.type,cell.locaion, cell.name, cell.color, groupID?: string,
        //         baseValue?: number,
        //         mortgageValue?: number,
        //         houseValue?: number,
        //         hotelValue?: number,
        //         rentBase?: number,
        //         rent1H?: number,
        //         rent2H?: number,
        //         rent3H?: number,
        //         rent4H?: number,
        //         rentHotel?: number,
        
        //         rent1R?: number,
        //         rent2R?: number,
        //         rent3R?: number,
        //         rent4R?: number,
        
        //         oneUtilityMult?: number,
        //         twoUtilityMult?: number,
        //         actionPrimary?: string,
        //         actionSecondary?: string);
        // }
    }
    


   

   

  

// //All cells:
//     /**
//      * Gets name of Cell
//      *
//      * @return name of this cell
//      */
//     public String getName() {
//         return name;
//     }

//     public int getLocation() {
//         return location;
//     }

//     /**
//      * Gets color of Cell.
//      *
//      * @return color of this cell
//      */
//     public String getColor() {
//         return color;
//     }

//     /**
//      * States if this Cell can be owned by a player.
//      *
//      * @return True if Cell can be owned by a player, False otherwise
//      */
//     public boolean getOwnable() {
//         return isOwnable;
//     }

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

//     /**
//      * Gets type of Cell. Type describes nature and enables different possible
//      * method behaviours.
//      *
//      * @return String describing type of cell ("property", "railroad",
//      * "utility", "jail", "special")
//      */
//     public CellType getCellType() {
//         return cellType;
//     }

// //Special Cells:
//     public String getActionType() {
//         return actionType;
//     }

//     public String getActionParamater() {
//         return actionParamater;
//     }

// //Ownable cells:
// //    public static Map getTotalOwnership() {
// //        return PLAYER_OWNERSHIP;
// //    }
//     /**
//      * Defines the ownership of this Cell. Sets the Cells ownership field to its
//      * new value and adds/overwrites static PLAYER_OWNERSHIP field with Cells
//      * name mapped to player ID
//      *
//      * @param newOwnerID the unique identifier for the owning player
//      */
//     public void setOwnership(Integer newOwnerID) {
//         currentOwner = newOwnerID;
//         PLAYER_OWNERSHIP.put(name, newOwnerID);
//         Cells.PLAYER_OWNERSHIP.put(this, newOwnerID);
//     }

//     /**
//      * Returns the unique ID of the player who owns this Cell.
//      *
//      * @return owning player ID, null if this Cell is not owned
//      */
//     public Integer getOwnership() {
//         return currentOwner;
//     }

//     /**
//      * States if the Cell is currently mortgaged
//      *
//      * @return True if this Cell is mortgaged (mortgageState = true), False
//      * otherwise
//      */
//     public boolean isMortgaged() {
//         return mortgageState;
//     }

//     /**
//      * Designates Cell as being (un)mortgaged. Does not implement higher rules
//      * of game
//      *
//      * @param set true if property is to be mortgaged, false if property is
//      * being un-mortgaged
//      */
//     public void setMortgageState(boolean set) {
//         mortgageState = set;
//     }

//     public int getMortgageValue() {
//         return mortgageValue;
//     }

//     /**
//      * Checks if Cell can be (un)mortgaged
//      *
//      * @param action The mortgage action to be checked for. Either "mortgage" or
//      * "unmortgage".
//      * @return True if stated action type is valid under current rules and
//      * property state. False otherwise
//      */
//     public boolean isMortgageActionValid(String action) {
//         boolean returnStatement = false;
//         switch (action) {
//             //check if cell can be mortgaged
//             case "mortgage":
//                 //check if cell is ownable; if not then cannot be mortgaged
//                 if (!getOwnable()) {
//                     System.out.println("\tThis type of cell (" + getCellType() + ") is not ownable and so cannot be mortgaged");
//                 } else if (isMortgaged()) {
//                     //Property type is ownable
//                     //check if property is already mortgaged; if so then cannot be mortgaged
//                     System.out.println("\tThis property is already mortgaged");
//                 } else if (houseCount > 0 || hotelCount == 1) {
//                     //Property is ownable and is not currently mortgaged.
//                     //Check if property is improved; if so then cannot be mortgaged
//                     System.out.println("\tImproved properties cannot be mortgaged");
//                 } else {
//                     //Property is ownable, unmortgaged and unimproved and thus may be mortgaged
//                     returnStatement = true;
//                 }
//                 break;
//             case "unmortgage":
//                 //Check if cell is already un-mortgaged
//                 if (!isMortgaged()) {
//                     //If property is not mortgaged then it cannot be unmortgaged.
//                     System.out.println("\tThis property is not mortgaged");
//                 } else if ((Rules.isMortgageInterestEnabled() && Players.get(currentOwner).getCash() < mortgageValue + (mortgageValue / Rules.getMortgageInterestRate())) || (!Rules.isMortgageInterestEnabled() && Players.get(currentOwner).getCash() < mortgageValue)) {
//                     System.out.println("\tInsufficient funds avaliable to unmortgage this property");
//                 }
//                 break;
//         }
//         return returnStatement;
//     }

//     /**
//      * Mortgages Cell with additional checks
//      */
//     public void mortgageProperty() {
//         if (isMortgageActionValid("mortgage")) {
//             setMortgageState(true);
//             System.out.println("\t" + Players.get(currentOwner).getName() + " mortgages " + name + " for " + mortgageValue);
//             Players.get(currentOwner).playerCashRecieve(-1, mortgageValue);

//         }
//     }

//     /**
//      * Un-mortgages Cell after checking
//      */
//     public void unmortgageProperty() {
//         if (isMortgageActionValid("unmortgage")) {
//             int unmortgageValue = (Rules.isMortgageInterestEnabled()) ? mortgageValue + (mortgageValue / Rules.getMortgageInterestRate()) : mortgageValue;
//             setMortgageState(false);
//             System.out.println("\t" + Players.get(currentOwner).getName() + " unmortgages " + name + " for " + unmortgageValue);
//             Players.get(currentOwner).playerCashPay(-1, unmortgageValue);
//         }
//     }

//     /**
//      * Returns PROPERTY_ID_BY_NAME; a static Map between ownable Cells (K,
//      * String) and their group IDs (V, Character). Used to track which
//      * property-types are members of which groups for determining improvements
//      *
//      * @return PROPERTY_ID_BY_NAME
//      */
//     public Map<String, Character> getPropertyIDbyName() {
//         return PROPERTY_ID_BY_NAME;
//     }

//     /**
//      * Takes keys of PLAYER_OWNERSHIP which have corresponding values equal to
//      * the ID of the player who owns this property.
//      *
//      * @return List of all properties (including this one) owned by the player
//      * who owns this property
//      */
//     public ArrayList getOwningPlayerOwnership() {
//         ArrayList<String> returnList;
//         returnList = new ArrayList<>();
//         PLAYER_OWNERSHIP.keySet().stream().filter((o) -> (PLAYER_OWNERSHIP.get(o).equals(currentOwner))).forEach((String o) -> {
//             returnList.add((String) o);
//         });
//         return returnList;
//     }

//     /**
//      * Returns this Cells property group ID character
//      *
//      * @return this Cells property group ID character
//      */
//     public char getPropertyGroupID() {
//         return groupID;
//     }

//     /**
//      * Returns list of group IDs of properties owned by player who owns this
//      * Cell
//      *
//      * @return list of group IDs of properties owned by player who owns this
//      * Cell
//      */
//     public ArrayList getOwningPlayerGroupID() {
//         ArrayList<Character> returnList;
//         returnList = new ArrayList<>();
//         for (int i = 0; i < getOwningPlayerOwnership().size(); i++) {
//             returnList.add(getPropertyIDbyName().get((String) getOwningPlayerOwnership().get(i)));
//         }
//         return returnList;
//     }
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

//     public List getPropertyGroupMembers() {
//         List<Cell> groupMembers = new ArrayList<>();
//         for (int i = 1; i <= Cells.locationsAmount(); i++) {
//             if (Cells.get(i).getPropertyGroupID() == groupID) {
//                 groupMembers.add(Cells.get(i));
//             }
//         }
//         return groupMembers;
//     }

//     public int memberGroupMortgageCount() {
//         int returnValue = 0;
//         for (Object check : getPropertyGroupMembers()) {
//             if (((Cell) check).isMortgaged()) {
//                 returnValue++;
//             }
//         }
//         return returnValue;
//     }

//     /**
//      * Returns current rent for this Cell (property or railroad)
//      *
//      * @return current rent value
//      */
//     public int getRent() {
//         int returnCase = 0;
//         if (isMortgaged()) {
//             System.out.println("\tRent cannot be collected on mortgaged properties");
//         } else {
//             switch (getCellType()) {
//                 case PROPERTY:
//                     if (hotelCount == 1) {
//                         returnCase = rentHotel;
//                     } else if (houseCount == 0) {
//                         //if property is member of a complete set and all set members are unmortgaged and are unimproved,
//                         if (isSetComplete() && memberGroupMortgageCount() > 0) {
//                             returnCase = rentBase * Rules.getGroupCompletRentBonus();
//                         } else {
//                             returnCase = rentBase;
//                         }
//                     } else {
//                         switch (houseCount) {
//                             case 1:
//                                 returnCase = rent1H;
//                                 break;
//                             case 2:
//                                 returnCase = rent2H;
//                                 break;
//                             case 3:
//                                 returnCase = rent3H;
//                                 break;
//                             case 4:
//                                 returnCase = rent4H;
//                                 break;
//                         }
//                     }
//                     break;
//                 case RAILROAD:
// //                    switch (getOwningPlayerGroupFrequency()) {
// //                        case 1:
// //                            returnCase = rentBase;
// //                            break;
// //                        case 2:
// //                            returnCase = rent2R;
// //                            break;
// //                        case 3:
// //                            returnCase = rent3R;
// //                            break;
// //                        case 4:
// //                            returnCase = rent4R;
// //                            break;
// //                    }
//                     returnCase = (int) railroadRentConditions.get(getOwningPlayerGroupFrequency() - memberGroupMortgageCount());

//                     break;
//             }
//         }
//         return returnCase;
//     }

//     /**
//      * Returns the rent for this Cell (utility) Multiplies current dice roll by
//      * value determined by players utility ownership.
//      *
//      * @param diceValue The total value of the latest dice roll (sum of all
//      * faces)
//      * @return current rent value
//      */
//     public int getRent(int diceValue) {
//         int returnCase = 0;
//         switch (getOwningPlayerGroupFrequency()) {
//             case 1:
//                 returnCase = (oneUtilityMult * diceValue);
//                 break;
//             case 2:
//                 returnCase = (twoUtilityMult * diceValue);
//                 break;
//         }
//         return returnCase;
//     }

//     /**
//      * Returns specific rent value based on Cell type (property, railroad,
//      * utility) and condition (1 house, 2 houses,...,1 rail, 2 rails... etc )
//      *
//      * @param field rent condition ("rentBase","rent1H",.., )
//      * @return
//      */
//     public int getRent(String field) {
//         int returnCase = 0;
//         switch (getCellType()) {
//             case PROPERTY:
//                 switch (field) {
//                     case "Base":
//                         if (isSetComplete()) {
//                             returnCase = 2 * rentBase;
//                             break;
//                         } else {
//                             returnCase = rentBase;
//                             break;
//                         }
//                     //break;
//                     case "1H":
//                         returnCase = rent1H;
//                         break;
//                     //break;
//                     case "2H":
//                         returnCase = rent2H;
//                         break;
//                     //break;
//                     case "3H":
//                         returnCase = rent3H;
//                         break;
//                     //break;
//                     case "4H":
//                         returnCase = rent4H;
//                         break;
//                     //	break;
//                     case "Hotel":
//                         returnCase = rentHotel;
//                     //	break;
//                 }
//                 break;
//             case RAILROAD:
//                 switch (field) {
//                     case "Base":
//                         returnCase = rentBase;
//                         break;
//                     //break;
//                     case "2R":
//                         returnCase = rent2R;
//                         break;
//                     //break;
//                     case "3R":
//                         returnCase = rent3R;
//                         break;
//                     //break;
//                     case "4R":
//                         returnCase = rent4R;
//                         break;
//                     //break;
//                 }
//                 break;
//             case UTILITY:
//                 switch (getOwningPlayerGroupFrequency()) {
//                     case 1:
//                         returnCase = oneUtilityMult;
//                         break;
//                     //break;
//                     case 2:
//                         returnCase = twoUtilityMult;
//                         break;
//                     //break;
//                 }
//                 break;
//         }
//         return returnCase;
//     }

// //Property types only:
//     //    /**
// //     * Returns state of property Cells improvement 0 - unimproved 1 - 1 House
// //     * .... 5 - Hotel
// //     *
// //     * @return integer relating current state of property improvement
// //     */
// //    public int getImprovmentState() {
// //        return improvemntState;
// //    }
//     /**
//      * Checks if property is part of a complete, sole player owned set Used to
//      * determine validity for buying improvements and current rent
//      *
//      * @return True if property is part of complete set, false otherwise
//      */
//     public boolean isSetComplete() {
//         return (getOwningPlayerGroupFrequency() == getGroupFrequency());
//     }

//     /**
//      * Checks if property can support an improvement
//      *
//      * @return True if rules allow property to be improved, false otherwise
//      */
//     public boolean addImprovementsValid() {
//         boolean isValid = false;
//         //Can the player afford improvemens?
//         //cost of improvement is a house if houseCount < propertyHotelReq(), else its a hotel.
//         int improvementUnitCost = (houseCount < Rules.getPropertyHotelReq()) ? houseValue : hotelValue;
//         //is even build enabled
//         //if so, get size of property memebr group, then multiply by cost of improvement
//         int improvementNetCost = (Rules.isPropertyEvenBuildEnabled()) ? improvementUnitCost * getOwningPlayerGroupFrequency() : improvementUnitCost;
//         //Check if player owns complete set
//         if (!isSetComplete()) {
//             //Return message is set uncomplete
//             System.out.println("\tCannot improve properties belonging to incomplete sets");
//             //check if property is of correct type
//         } else if (getCellType() != CellType.PROPERTY) {
//             System.out.println("\tThis cell type (" + getCellType() + ") cannot be improved");
//             //check if property is mortgaged
//         } else if (isMortgaged()) {
//             // if is mortgaged, throw exception
//             System.out.println("\tCannot improve mortgaged property");
//             //otherwise, proceed to check if property improvment limits are reached
//         } else if (hotelCount == 1) {
//             if (Rules.isImprovementResourcesFinite() && Rules.getImprovementAmountHotel() == 0) {
//                 System.out.println("\tCannot improve property beyond 1 Hotel (and there are also no hotels avaliable)");
//             } else {
//                 System.out.println("\tCannot improve property beyond 1 Hotel");
//             }
//         } else if (Rules.isImprovementResourcesFinite() && Rules.getImprovementAmountHouse() == 0 && hotelCount == 0 && houseCount < Rules.getPropertyHotelReq()) {
//             System.out.println("\tP  roperty eligible for improvement but there are no houses avaliable to purchace");
//         } else if (Rules.isImprovementResourcesFinite() && Rules.getImprovementAmountHotel() == 0 && hotelCount == 0 && houseCount == Rules.getPropertyHotelReq()) {
//             System.out.println("\tProperty eligible for improvement but there are no hotels avaliable to purchace");
//             //check player has enough cash
//         } else if (Players.get(getOwnership()).getCash() < improvementNetCost) {
//             System.out.println("\t" + Players.get(getOwnership()).getName() + " cannot afford this improvement (cost: " + improvementNetCost + " - cash: " + Players.get(getOwnership()).getCash() + ")");
//         } else {
//             isValid = true;
//         }
//         return isValid;
//     }

//     public int getHouseCount() {
//         return houseCount;
//     }

//     public int getHotelCount() {
//         return hotelCount;
//     }

//     /**
//      * Adds 1 improvement to property if allowed by rules. Determines next
//      * improvement type and updates Cell field (house/hotel count, improvement
//      * level) accordingly
//      */
//     public void addImprovement() {
//         if (addImprovementsValid() && houseCount < Rules.getPropertyHotelReq()) {
//             houseCount++;
//             if (Rules.isImprovementResourcesFinite()) {
//                 Rules.setImprovementAmountHouse(Rules.getImprovementAmountHouse() - 1);
//             }
//             Players.get(currentOwner).playerCashPay(-1, houseValue);

//             System.out.println("\t" + Players.get(currentOwner).getName() + " builds a house on " + name + " - New Rent: " + getRent() + " - Houses left: " + Rules.getImprovementAmountHouse());
//             //improvemntState++;
//         } else if (addImprovementsValid() && houseCount == Rules.getPropertyHotelReq()) {
//             houseCount = 0;
//             Rules.setImprovementAmountHouse(Rules.getImprovementAmountHouse() + Rules.getPropertyHotelReq());
//             hotelCount = 1;
//             Rules.setImprovementAmountHotel(Rules.getImprovementAmountHotel() - 1);
//             Players.get(currentOwner).playerCashPay(-1, hotelValue);
//             System.out.println("\t" + Players.get(currentOwner).getName() + " builds a hotel on " + name + " - New Rent: " + getRent());

//             //improvemntState++;
//         }
//     }

//     /**
//      * Determines if property can have an improvement (House/Hotel) removed from
//      * it
//      *
//      * @return True if property improvement can be downgraded, False otherwise
//      */
//     public boolean removeImprovementsValid() {
//         //default return value
//         boolean isValid = false;
//         //is property unimproved
//         if ((houseCount == 0 && hotelCount == 0)) {
//             //return message
//             System.out.println("\tCannot remove improvements from unimproved property");
//             //else, property has some level of improvement
//         } else if (Rules.isImprovementResourcesFinite()) {
//             //check rules for finite resources - else if resources are infinite then removal will be valid
//             //if resources are finte, and the player is selleing a hotel then check that the bank has enough houses to downgrade
//             if (hotelCount == 1) {
//                 //determine how many houses are needed.  Is even build enabled?
//                 if ((Rules.isPropertyEvenBuildEnabled() && (getOwningPlayerGroupFrequency() * Rules.getPropertyHotelReq() > Rules.getImprovementAmountHouse())) || (!Rules.isPropertyEvenBuildEnabled() && Rules.getPropertyHotelReq() > Rules.getImprovementAmountHouse())) {
//                     //removal must be even across all property group members - get the size of membership and multiply by hotelReq
//                     System.out.println("\tInsufficient amount of houses avaliable to downgrade from hotel");
//                 }
//             }
//         } else {
//             isValid = true;
//         }
//         return isValid;
//     }

//     /**
//      * Removes 1 improvement from property if allowed by rules
//      */
//     public void removeImprovements() {
//         // if action valid
//         if (removeImprovementsValid()) {
//             //and improvement state less than 5 (no hotel) then remove a house
//             if (hotelCount == 0) {
//                 //remove house form cell
//                 houseCount--;
//                 //add house to bank
//                 Rules.setImprovementAmountHouse(Rules.getImprovementAmountHouse() + 1);
//                 //credit owning players acount with resale value (initial sale value divided by penalty amount (default: 2) )
//                 Players.get(getOwnership()).playerCashRecieve(-1, (int) (houseValue / Rules.getPropertyResalePenaltyValue()));
//                 //Otherwise, remove a hotel.
//             } else {
//                 //deduct from cells hotel count
//                 hotelCount = 0;
//                 //revert cells house count to upper bonud (default: 4)
//                 houseCount = Rules.getPropertyHotelReq();
//                 //subtract above quantity of houses from game
//                 Rules.setImprovementAmountHouse(Rules.getImprovementAmountHouse() - Rules.getPropertyHotelReq());
//                 //add 1 hotel back into game
//                 Rules.setImprovementAmountHotel(Rules.getImprovementAmountHotel() + 1);
//                 //credit players account with resale value
//                 Players.get(getOwnership()).playerCashRecieve(-1, (int) (hotelValue / Rules.getPropertyResalePenaltyValue()));
//             }
    //     }
    // }


