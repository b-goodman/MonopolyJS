import { LogEntry } from './LogEntry';
import { EventType } from "./enums"

export class GameLog {

    private static _GAME_LOG: Array<LogEntry> = [];
    private static _logCounter: number = 0;

    public static logPlayerTurn(playerTurn: LogEntry) {

        this._GAME_LOG.push(playerTurn);
    }

    public static get GAME_LOG() {
        return this._GAME_LOG;
    }

    public static get logCounter() {
        return this._logCounter;
    }

    public static incLogCounter() {
        this._logCounter++;
    }
}
