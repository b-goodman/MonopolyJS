import { Player } from './Player';
import { Token } from "./enums";

interface INumberTMap<T> { [key: number]: T; };
interface NumberPlayerMap extends INumberTMap<Player> {};

export class Players {

    /**
     * Maps unique player ID (K, Integer) to player (V, Player)
     */
    public const static PLAYERS:NumberPlayerMap = {};

    /**
     * Creates a new instance of the default Player class and stores it within
     * PLAYERS
     *
     * @param name String - name of player
     * @param index Integer - unique player ID
     * @param token Token - players token
     */
    public static add(
            name: string,
            token: Token
    ) {
        let currentPlayersLen: number = Players.amount();
        let playerIndex: number = currentPlayersLen + 1;
        Players.PLAYERS[playerIndex] = new Player(playerIndex, name, token);
    }


    /**
     * Gets Player obj. corresponding to player ID from PLAYERS map.
     *
     * @param playerID Returns specified Player using players ID
     * @return
     */
    public static get(playerID: number): Player {
        return Players.PLAYERS[playerID];
    }

    public static amount(): number {
        return (<any>Object).keys(Players.PLAYERS).length();
    }

    public static Map<Integer, Player> getPlayers() {
        //problem - saves Player objects - continually update
        //Map<Integer, Player> returnMap = new HashMap<>(PLAYERS);
        //Map<Integer, Player> returnMap;

        //Map<Integer, Player> returnMap = Collections.unmodifiableMap(PLAYERS);
        return PLAYERS;
    }

    public static Set<Token> getAvaliableTokens() {
        //get remaining tokens
        Set<Token> unavaliableTokens = new HashSet<>();
        for (Player player : Players.getPlayers().values()) {
            unavaliableTokens.add(player.getToken());
        }
        Set<Token> allTokens = new HashSet<>(Arrays.asList(Token.values()));

        allTokens.removeAll(unavaliableTokens);

        return allTokens;
    }

}
