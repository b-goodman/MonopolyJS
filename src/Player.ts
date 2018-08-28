import { Token } from "./enums";
import { Card } from "./Card";
import { LogEntry } from "./LogEntry";

export class Player {

    //Player ID
    private playerID: number;

    //Players name
    private name: string;

    //Design of player's token
    private token: Token;

    //Player's position by gameboard location index
    private position: number;

    //Player's avaliable cash
    private cash: number;

    //Ammount of "get out of jail free" cards avaliable to player
    private jailBondsAvaliableChance: number;
    private jailBondsAvaliableChest: number;

    private exitingJail:boolean;

    //Is player in jail?
    private inJail: boolean;

    //ammont of consequtive doubles rolled in sinlge turn
    private speedingCount: number;
    //number of turns spent in jail

    private jailTimeSpent: number;

    //players currently drawn card
    private currentCard: Card;

    //log of players current turn
    private logEntry: LogEntry;

    /**
     * Constructor for default player. Cash, starting position and bonds
     * avaliable all set to default.
     *
     * @param playerID Unique integer to identify player and locate in static
     * PLAYERS map.
     * @param name String to identify players to user
     * @param token Token enum to visually locate player on game board
     */
    public Player(Integer playerID, String name, Token token) {
        this.playerID = playerID;
        this.name = name;
        this.token = token;
        this.position = 1;
        this.cash = 1500;
        this.jailBondsAvaliableChance = 0;
        this.jailBondsAvaliableChest = 0;
    }

    /**
     * Constructor for custom player. User may specify players starting cash,
     * position and amount of jail bonds avaliable.
     *
     * @param playerID Unique integer to identify player and locate in static
     * PLAYERS map.
     * @param name String to identify players to user
     * @param token Token enum to visually locate player on game board
     * @param position The starting location for the player. Position 1 by
     * default.
     * @param cash The starting cash amount for the player. 1500 by default
     * @param jailBondsAvaliable The amount of jail bonds avaliable to the
     * player. 0 by default.
     */
    public Player(Integer playerID, String name, Token token, int position, int cash, int jailBondsAvaliable) {
        this.playerID = playerID;
        this.name = name;
        this.token = token;
        this.position = position;
        this.cash = cash;
        //this.jailBondsAvaliableChance = jailBondsAvaliableChance;
        //this.jailBondsAvaliableChest = jailBondsAvaliableChest;
    }

//Get player's -
    /**
     * Returns the players unique integer identifier
     *
     * @return int - players ID
     */
    public Integer getPlayerID() {
        return playerID;
    }

    /**
     * Returns the players name
     *
     * @return String - player's name
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the players token (enum)
     *
     * @return enum - player's token
     */
    public Token getToken() {
        return token;
    }

    /**
     * Returns the position of the player in terms of its location on the game
     * board/index of LOCATIONS
     *
     * @return LOCATIONS key / board position
     */
    public int getPosition() {
        return position;
    }

    public void setPlayerID(Integer newID) {
        playerID = newID;
    }

    public void setPlayerName(String newName) {
        name = newName;
    }

    public void setPlayerToken(Token newToken) {
        token = newToken;
    }

    public void setPlayerStartingCash(int newCash) {
        cash = newCash;
    }

    /**
     * Gets the type of cell which the player is currently occupying
     *
     * @return [string] Cell type currently occupied by player.
     */
    public CellType getPositionType() {
        return Cells.get(getPosition()).getCellType();
    }

    public String getActionType() {
        return Cells.get(getPosition()).getActionType();
    }

    public String getActionParamater() {
        return Cells.get(getPosition()).getActionParamater();
    }

    /**
     * Gets name of current position cell
     *
     * @return
     */
    public String getPositionName() {
        return Cells.get(getPosition()).getName();
    }

    /**
     * Gets name of specified cell
     *
     * @param cellPosition [int] specification for cell. Cells position on
     * board.
     * @return [String] Name of cell
     */
    public String getPositionName(int cellPosition) {
        return Cells.get(cellPosition).getName();
    }

    /**
     * Returns the integer value of cash avaliable to the player
     *
     * @return
     */
    public int getCash() {
        return cash;
    }

    /**
     * Return amount of "get out of jail free" card(s) avaliable to the player
     *
     * @return
     */
    public int getBonds() {
        return jailBondsAvaliableChance + jailBondsAvaliableChest;
    }

    /**
     * Is the player in jail? T/F
     *
     * @return True if player is in jail, False otherwise.
     */
    public boolean isInJail() {
        return inJail;
    }

    /**
     * How many consecutive turns has the player spent in jail
     *
     * @return [int] number of turns spent in current 'in jail' event.
     */
    public int getJailTimeSpent() {
        return jailTimeSpent;
    }

    /**
     * How many doubles has the player rolled so far this turn? Resets to 0 at
     * end of turn.
     *
     * @return [int] amount of doubles rolled on this current turn.
     */
    public int getSpeedingCount() {
        return speedingCount;
    }

    /**
     * Returns last card drawn by this player
     *
     * @return [List] Card last drawn by player.
     */
    public List getCurrentCard() {
        return currentCard;
    }

//Set players:
//    /**
//     * Sets the player as being in Jail.
//     *
//     * @param jailState True: in Jail, False otherwise.
//     */
//    public void setJailState(boolean jailState) {
//        inJail = jailState;
//    }
//    /**
//     * Sets the amount of time (in turns) the player has currently been in jail
//     * for.
//     *
//     * @param time
//     */
//    public void setJailTimeSpent(int time) {
//        jailTimeSpent = time;
//    }
    /**
     * Set new position for player on game board
     *
     * @param newPosition Location on game board given as index of Cells
     * position in LOCATIONS
     */
    public void setPosition(int newPosition) {
//        if (newPosition < position && newPosition != 0) {
//            System.out.println("\t" + name + " passes GO - Collect " + Rules.getPassGoCredit());
//            playerCashRecieve(0, Rules.getPassGoCredit());
//        }
        position = newPosition;
    }

    /**
     * Overrides players cash amount with new value
     *
     * @param newCashAmmount New value of players cash
     */
    public void setCash(int newCashAmmount) {
        cash = newCashAmmount;
    }

    public void setName(String newName) {
        name = newName;
    }

    /**
     *
     * @param payingPlayerID [0,1,2...] for players use -1 for bank
     * @param cashAmount
     */
    public void playerCashRecieve(Integer payingPlayerID, int cashAmount) {
        if (payingPlayerID >= 0) {
            Player payingPlayer = Players.get(payingPlayerID);
            addCash(cashAmount);
            payingPlayer.addCash(-cashAmount);
            logEntry.logEvent(RECEIVE, cashAmount, payingPlayerID);
        } else {
            addCash(cashAmount);
            logEntry.logEvent(RECEIVE, cashAmount, payingPlayerID);
        }
    }

    public void playerCashPay(Integer recievingPlayerID, int cashAmount) {
        if (recievingPlayerID >= 0) {
            Player recievingPlayer = Players.get(recievingPlayerID);
            addCash(-cashAmount);
            recievingPlayer.addCash(cashAmount);
            logEntry.logEvent(PAY, cashAmount, recievingPlayerID);
        } else {
            addCash(-cashAmount);
            logEntry.logEvent(PAY, cashAmount, recievingPlayerID);
        }
    }

    /**
     * Add(take) an amount of cash to(from) player via an increment(decrement)
     *
     * @param addAmmount Positive(negative) values will add to(remove from)
     * players account
     */
    public void addCash(int addAmmount) {
        cash += addAmmount;
    }

//    /**
//     * Add(take) a "Get out of jail free card" to(from) the player
//     *
//     * @param addAmmount Positive(negative) integer value will give to(remove
//     * from) player
//     */
//    public void addJailBond(int addAmmount) {
//        jailBondsAvaliable += addAmmount;
//    }
    /**
     * Sets player as owner of specified Cell at location on game board
     *
     * @param propertyBoardLocation The location of the property in terms of its
     * position on the game board/index in LOCATIONS
     */
    public void setOwnership(Integer propertyBoardLocation) {
        (Cells.get(propertyBoardLocation)).setOwnership(playerID);
    }

    //look through Cells.getPlayerOwnership()
    //return all cells with value == this.playerID
    public List<Cell> getOwnership() {
        List<Cell> playerOwnershipList = new ArrayList<>();
        Cells.getPlayerOwnership().keySet().stream().filter((propertyName) -> ((int) Cells.getPlayerOwnership().get(propertyName) == playerID)).forEach((propertyName) -> {
            playerOwnershipList.add((Cell) propertyName);
        });
        return playerOwnershipList;
    }

    public List getCompleteSets() {
        List<Cell> completeProperties = new ArrayList<>();
        Iterator<Cell> test = getOwnership().iterator();
        while (test.hasNext()) {
            Cell cand = test.next();
            if (cand.isSetComplete()) {
                completeProperties.add(cand);
            }
        }
        return completeProperties;
    }

    public List<Cell> getPropertyGroupMembers(char groupID) {
        List<Cell> groupMembers = new ArrayList<>();
        for (int i = 1; i <= Cells.locationsAmount(); i++) {
            if (Cells.get(i).getPropertyGroupID() == groupID) {
                groupMembers.add(Cells.get(i));
            }
        }
        return groupMembers;
    }

    public Set<Character> getCompleteSetID() {
        List<Character> propertyIDs = new ArrayList<>();
        for (Object q : getCompleteSets()) {
            Cell temp = (Cell) q;
            propertyIDs.add(temp.getPropertyGroupID());
        }
        return new HashSet<>(propertyIDs);
    }

//    public void addPropertyImprovementByGroup(char groupID) {
//        List q = getPropertyGroupMembers(groupID);
//        for (int i = 0; i < q.size(); i++) {
//            ((Cell) q.get(i)).addImprovement();
//        }
//    }
    public void addPropertyImprovementByGroup(char groupID) {
        for (Cell groupMember : getPropertyGroupMembers(groupID)) {
            groupMember.addImprovement();
            logEntry.logEvent(HOUSE_ADD, groupMember.getLocation(), groupMember.getRent(), Rules.getImprovementAmountHouse());
        }
    }

    public double getOwnedPropertyImprovementValue() {
        double returnImprovementValue;
        double sum = 0.0;
        for (Cell ownedCell : getOwnership()) {
            if (ownedCell.getHotelCount() == 0) {
                if (ownedCell.getHouseCount() == 0) {
                    //property has no improvements
                    returnImprovementValue = 0.0;
                } else {
                    //property has no hotels but >0 houses
                    returnImprovementValue = (ownedCell.getHouseCount() * ownedCell.getHouseValue()) * ((double) 1 / Rules.getPropertyResalePenaltyValue());
                }
            } else {
                //property has >0 hotel
                returnImprovementValue = ((Rules.getPropertyHotelReq() * ownedCell.getHouseValue()) + ownedCell.getHotelValue()) * ((double) 1 / Rules.getPropertyResalePenaltyValue());
            }
            sum += returnImprovementValue;
        }
        return sum;
    }

    public double getOwnedPropertyBaseValue() {
        double sum = 0;
        for (Cell ownedCell : getOwnership()) {
            sum += ownedCell.getMortgageValue();
        }
        return sum;
    }

    public double getOwnedPropertyNetValue() {
        return getOwnedPropertyBaseValue() + getOwnedPropertyImprovementValue();
    }

    public double getPlayerNetWorth() {
        return cash + getOwnedPropertyNetValue();
    }

    public void mortgageProperty(Integer propertyID) {
        Cells.get(propertyID).mortgageProperty();
    }

    public void unMortgageProperty(Integer propertyID) {
        Cells.get(propertyID).unmortgageProperty();
    }

    /**
     * Returns cells type for specified location
     *
     * @param cellLocation Location of cell on game board
     * @return [String] type of cell ("property","railroad","utility"...)
     */
    public CellType getCellType(int cellLocation) {
        return Cells.LOCATIONS.get(cellLocation).getCellType();
    }

    /**
     * Sends the player to jail by setting the players inJail state to True and
     * positions the player to 0.
     */
    public void gotoJail() {
        logEntry.logEvent(JUMP, 0);
        inJail = true;
        position = 0;
    }

    /**
     * Exits the player from jail; sets inJail state as False, repositions the
     * player back onto the game board and resets the jail time counter.
     */
    public void leaveJail() {
        inJail = false;
        position = 11;
        jailTimeSpent = 0;
        exitingJail = true;
        logEntry.logEvent(NOTIFICATION, "player exits jail");

    }

    public boolean isPlayerExitingJail() {
        return exitingJail;
    }

    //end set
    /**
     * Returns board location of next specified cell type
     *
     * @param target [String] Type of cell to search for
     * @return [int] Board location of target cell
     */
    public int findNextCellType(CellType target) {
        int i = getPosition();
        CellType search = getCellType(i);
        while (!search.equals(target)) {
            i++;
            while (i > 40) {
                i -= 40;
            }
            search = getCellType(i);
        }
        return i;
    }

    public int findNextCellType(String target) {
        int i = getPosition();
        CellType search = getCellType(i);
        while (!search.equals(CellType.valueOf(target))) {
            i++;
            while (i > 40) {
                i -= 40;
            }
            search = getCellType(i);
        }
        return i;
    }

    public int cashSignificance(int debitValue) {
        int returnValue = 0;
        int sig = (debitValue / cash) * 100;
        if (sig >= 10 && sig < 20) {
            returnValue = 1;
        } else if (sig >= 20 && sig < 40) {
            returnValue = 2;
        } else if (sig > 40) {
            returnValue = 3;
        }
        return returnValue;
    }

    public int cellBenefit(Cell testLocation) {
        int benefit = 0;
        //check if cell is ownable
        if (testLocation.getOwnable()) {
            //check if owned
            if (testLocation.getOwnership() == null) {
                //is unowned
                benefit += 2;
                //does player already own part of set
                int freq = 0;
                char testID = testLocation.getPropertyGroupID();
                for (Cell cell : getOwnership()) {
                    if (cell.getPropertyGroupID() == testID) {
                        freq++;
                    }
                }
                //if so, inc. benefit
                if (freq > 0) {
                    benefit++;
                    //and does the property complete a set
                    if (freq == testLocation.getGroupFrequency() - 1) {
                        benefit++;
                    }
                }
            } else {
                //property is onwed, get rent
                //is type UTILITY
                int testRent;
                if (testLocation.getCellType() == UTILITY) {
                    testRent = testLocation.getRent(Dice.getExpectedRoll().get(0));
                } else {
                    //type PROPERTY or RAILROAD
                    testRent = testLocation.getRent();
                }
                //is the rent significant
                benefit -= cashSignificance(testRent);
            }
        } else {
            String type = testLocation.getActionType();
            switch (type) {
                case "drawCard":
                    if ("chest".equals(testLocation.getActionParamater())) {
                        //assume chest to have good outcome
                        benefit++;
                    } else {
                        //assume chest to have nominal to negative outcome
                        benefit--;
                    }
                    break;
                case "debitAbs":
                case "debitRel":
                    benefit -= cashSignificance(Integer.parseInt(testLocation.getActionParamater()));
                    break;
                case "creditAbs":
                case "creditRel":
                    benefit += cashSignificance(Integer.parseInt(testLocation.getActionParamater()));
                    break;
                case "parking":
                    //defualt action is null, thus a positive outcome
                    benefit++;
                    //is bonus enabled
                    if (Rules.isFreeParkingBonusEnabled()) {
                        benefit += cashSignificance(Rules.getFreeParkingBonusValue());
                    }
                    break;
                case "transitionAbs":
                    if ("0".equals(testLocation.getActionParamater())) {
                        benefit--;
                    } else {
                        benefit = cellBenefit(Cells.get(Integer.valueOf(testLocation.getActionParamater())));
                    }
                    break;
                case "transitionRel":
                    int newLocation = testLocation.getLocation() + Integer.parseInt(testLocation.getActionParamater());
                    Cell newCell = Cells.get(newLocation);
                    benefit = cellBenefit(newCell);
                    break;
            }
        }
        return benefit;
    }

    public boolean leaveJailEarly() {
        boolean leaveJail = false;
        int leaveJailFrom = 11;
        double resultsPositive = 0;
        double resultsNegative = 0;
        for (int roll : Dice.getRollProbabilities().keySet()) {
            Cell testCell = Cells.get(leaveJailFrom + roll);
            int result = cellBenefit(testCell);
            if (result > 0) {
                resultsPositive += (result * Dice.getRollProbabilities().get(roll));
            } else {
                resultsNegative += (result * Dice.getRollProbabilities().get(roll));
            }
        }
        if (resultsPositive > resultsNegative) {
            leaveJail = true;
        }
        return leaveJail;
    }

    public void initializeTurn() {

        this.logEntry = new LogEntry(playerID);
        logEntry.logEvent(START);
    }

    /**
     * Calling this method begins the player's turn.
     */
    public void beginTurn() {
        logEntry.logEvent(PLAYER);
        Dice.clearRoll();
        // player rolls dice and reads value
        Dice.roll();
        int steps = Dice.getRollSum();

        if (isInJail() && jailTimeSpent < Rules.getMaxJailTerm()) {
            //Decide if best to leave jail early or take default method (roll dice)
            //Take dice roll expectation - Dice.getExpectationRoll() -

            //Leave jail early:
            //1: use card if avaliable
            //            if (jailBondsAvaliableChance > 0) {
            //                ChanceCards.reinsertJailBond();
            //                jailBondsAvaliableChance--;
            //            } else if (jailBondsAvaliableChest > 0) {
            //                ChestCards.reinsertJailBond();
            //                jailBondsAvaliableChest--;
            //            }
            //2: pay fee (default: 50)
            //Default action: Roll dice.  If doubles, advance token by thown amount.  Do not roll again.
            if (Dice.isDouble(Dice.getFaceValues())) {
                logEntry.logEvent(NOTIFICATION, name + " rolls doubles " + Dice.getFaceValues() + " and gets to leave jail early!");
                leaveJail();
                advanceToken(steps);
            } else {
                //else, take another turn in jail
                jailTimeSpent++;
                logEntry.logEvent(NOTIFICATION, name + " fails to roll doubles " + Dice.getFaceValues() + " and spends another turn in jail (turns until release: " + (Rules.getMaxJailTerm() - jailTimeSpent) + ")");
                //endTurn();
            }
            //Player still in jail for maximum duration
        } else if (isInJail() && jailTimeSpent == Rules.getMaxJailTerm()) {
            //Player gets last chance to roll dice
            if (Dice.isDouble(Dice.getFaceValues())) {
                logEntry.logEvent(NOTIFICATION, name + " rolls doubles " + Dice.getFaceValues() + " and gets to leave jail early!");
                leaveJail();
                advanceToken(steps);
                //if unsucessful, player must pay fine and leave.
            } else {
                logEntry.logEvent(NOTIFICATION, name + " has failed to roll doubles " + Dice.getFaceValues() + " and has thus served the maximum jail term.");
                //check if player can afford fine -
                //if(cash>=Rules.getJailLeaveFee()) -- do below
                logEntry.logEvent(NOTIFICATION, name + " pays the fine");
                playerCashPay(-1, Rules.getJailLeaveFee());
                leaveJail();
                advanceToken(steps);
                //else - raise funds >= Rules.getJailLeaveFee()
            }
            //Player is not in jail:
        } else {
            // check if player rolls doubles; if so, and if speeding rule is enabled, increment speed counter
            logEntry.logEvent(ROLL_DICE);
            if (Dice.isDouble(Dice.getFaceValues())) {
                speedingCount++;
            }
            // check if players speed counter has reached limit (default 3); if so, send to jail.
            if (speedingCount == Rules.getDoublesSpeedingLimit()) {
                logEntry.logEvent(NOTIFICATION, name + " sent to jail for speeding");
                gotoJail();
                // otherwise, proceed with turn
            } else {
                //advance token
                advanceToken(steps);
            }
        }
    }

    public void midTurn() {
        if (getPositionType() == SPECIAL) {
            String type = getActionType();
            String para = getActionParamater();
            switch (type) {
                //Draw a card
                case "drawCard":
                    switch (para) {
                        // Draw Chance card
                        case "chance":
                            drawChanceCard();
                            break;
                        //Draw chest card
                        case "chest":
                            drawChestCard();
                            break;
                    }
                    // Actions for post card draw.  Print type of card drawn, parse drawn card action.
                    parseCardAction(readCurrentCard());
                    break;
                //Transition to new fixed location
                case "transitionAbs":
                    // The player is being sent to jail (lands on goto jail cell)
                    if ("0".equals(para)) {
                        gotoJail();
                    } else {
                        // Player has landed on some other transitional cell
                        advanceToken(Integer.parseInt(para));
                    }
                    break;
                //Recieve money
                case "creditAbs":
                    playerCashRecieve(-1, Integer.parseInt(para));
                    break;
                //Pay money
                case "debitAbs":
                    //If the free parking bonus rule is being enforced
                    if (Rules.isFreeParkingBonusEnabled()) {
                        //pay the money into the free parking fund
                        Rules.incFreeParkingBonusValue(Integer.parseInt(para));
                    } else {
                        //else, pay the bank
                        playerCashPay(-1, Integer.parseInt(para));
                    }
                    break;
                //Potentially do nothing.  Check rules.
                case "parking":
                    if (Rules.isFreeParkingBonusEnabled()) {
                        //get current amount of bonus cash
                        //pay amount to player.
                        playerCashRecieve(-1, Rules.getFreeParkingBonusValue());
                        //Clear bonus - set to 0
                        Rules.clearFreeParkingBonus();
                    }
                    //else, do nothing.
                    break;
            }
        } else {
            Cell occupiedCell = Cells.get((Integer) getPosition());
            //can cell be owned? if so..
            if (occupiedCell.getOwnable()) {
                //is it currently unowned? If so, purchace property
                if (occupiedCell.getOwnership() == null) {
                    cash -= occupiedCell.getBaseValue();
                    occupiedCell.setOwnership(getPlayerID());
                    logEntry.logEvent(PURCHACE, position, occupiedCell.getBaseValue());
                    //If it is owned but by the current player, then do nothing
                } else if (Objects.equals(occupiedCell.getOwnership(), getPlayerID())) {
                    //It is owned and by another player, then pay rent
                } else if (getPositionType() == UTILITY) {
                    playerCashPay(occupiedCell.getOwnership(), occupiedCell.getRent(Dice.getRollSum()));
                } else {
                    playerCashPay(occupiedCell.getOwnership(), occupiedCell.getRent());
                }
            }
        }
        if (Dice.isDouble(Dice.getFaceValues()) && !isInJail() && !isPlayerExitingJail()) {
            logEntry.logEvent(NOTIFICATION, name + " takes another turn");
        }

    }

    /**
     * ends players turn - resets speeding counter
     */
    public void endTurn() {
        logEntry.logEvent(END);
        speedingCount = 0;
        exitingJail = false;
        GameLog.logPlayerTurn(logEntry);
    }

    /**
     * Move player +- N steps. Rolls over if position exceeds 40.
     *
     * @param steps [int] Amount of steps player takes. If negative, player will
     * move backwards.
     */
    public void advanceToken(int steps) {
        //advance token
        position += steps;
        // get relative (to GO) postion - subtract 40 if abs. positon >40 (i.e., player circumvents the board by passing go)
        if (position > Cells.locationsAmount()) {
            //Player has circumvented the board
            position -= Cells.locationsAmount();
            //has the player passed or landed on GO
            if (position != 1) {
                //The player has passed GO
                logEntry.logEvent(NOTIFICATION, " passes GO");
                playerCashRecieve(-1, Rules.getPassGoCredit());
            }
        } else if (position < 1) {
            position += Cells.locationsAmount();
        }
        int positionInfoCost = Cells.get(position).getBaseValue();
        Integer positionInfoOwnership = Cells.get(position).getOwnership();
        int positionInfocurrentRent = (getPositionType() == UTILITY) ? (Cells.get(position)).getRent(Dice.getRollSum()) : Cells.get(position).getRent();

        if (Cells.get(position).getOwnable()) {
            if (positionInfoOwnership != null) {
                logEntry.logEvent(ADVANCE, steps, position, Players.get(positionInfoOwnership).getPlayerID(), positionInfocurrentRent);
            } else {
                logEntry.logEvent(ADVANCE, steps, position, positionInfoCost);
            }
        } else {
            logEntry.logEvent(ADVANCE, steps, position);
        }

    }

    public List drawChanceCard() {
        List newCard = ChanceCards.drawCard();
        currentCard = newCard;
        logEntry.logEvent(DRAW_CHANCE);
        return newCard;
    }

    public List drawChestCard() {
        List newCard = ChestCards.drawCard();
        currentCard = newCard;
        logEntry.logEvent(DRAW_CHEST);
        return newCard;
    }

    /**
     * Returns last card drawn by player. Returns null if player has not yet
     * drawn a card.
     *
     * @return [List] Last card drawn by player.
     */
    public List readCurrentCard() {
        return currentCard;
    }

    public void parseCardAction(List card) {
        String cardType = (String) card.get(2);
        String cardAction1 = (String) card.get(3);
        String cardAction2 = (String) card.get(4);

        // System.out.println("Parsing Card..");
        switch (cardType) {
            // cases of players transition to fixed, absolute location
            case "TRANSITION_ABS":
                position = Integer.parseInt(cardAction1);
                logEntry.logEvent(JUMP, Integer.parseInt(cardAction1));
                midTurn();
                return;
            // cases of players transition dependent on current location
            case "TRANSITION_REL":
                switch (cardAction1) {
                    // player advance to next property type (rail, util)
                    case "NEXT":
                        position = findNextCellType(cardAction2);
                        logEntry.logEvent(JUMP_NEXT, findNextCellType(cardAction2));
                        midTurn();
                        return;
                    // player advance N spaces from current position
                    case "GO":
                        advanceToken(Integer.parseInt(cardAction2));
                        midTurn();
                        return;
                }
                return;
            // player recieves jail card
            case "JAIL":
                switch (cardAction1) {
                    case "IN":
                        //player sent to jail
                        gotoJail();
                        return;

                    case "OUT":
                        //player gets out of jail free
                        return;
                }
                return;
            // cases of player recieving fixed sum of cash
            case "CREDIT_ABS":
                playerCashRecieve(-1, Integer.parseInt(cardAction1));
                return;
            // cases of player recieving variable ammount of cash dependent on current game params.
            case "CREDIT_REL":
                return;
            // cases of player paying fixed ammount of cash
            case "DEBIT_ABS":
                //If the free parking bonus rule is being enforced
                if (Rules.isFreeParkingBonusEnabled()) {
                    //pay the money into the free parking fund
                    logEntry.logEvent(NOTIFICATION, Rules.incFreeParkingBonusValue(Integer.parseInt(cardAction1)));
                    playerCashPay(-1, Integer.parseInt(cardAction1));
                } else {
                    //else, pay the bank
                    playerCashPay(-1, Integer.parseInt(cardAction1));
                }
                return;
            // player paying variable ammount of cash
            case "DEBIT_REL":
                switch (cardAction1) {
                    case "PAY_EACH":
                        //pay each player cardAction2
                        for (Integer i = 0; i < Players.amount(); i++) {
                            if (Objects.equals(i, playerID)) {
                                //do nothing
                            } else {
                                playerCashPay(i, Integer.parseInt(cardAction2));
                            }
                        }
                    // return;
                }
            //return;
        }
    }

}
