"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Player_1 = require("./Player");
var enums_1 = require("./enums");
;
;
var Players = /** @class */ (function () {
    function Players() {
    }
    /**
     * Creates a new instance of the default Player class and stores it within
     * PLAYERS
     *
     * @param name String - name of player
     * @param index Integer - unique player ID
     * @param token Token - players token
     */
    Players.add = function (name, token) {
        var currentPlayersLen = Players.amount();
        var playerIndex = currentPlayersLen + 1;
        Players._PLAYERS[playerIndex] = new Player_1.Player(playerIndex, name, token);
    };
    /**
     * Gets Player obj. corresponding to player ID from PLAYERS map.
     *
     * @param playerID Returns specified Player using players ID
     * @return
     */
    Players.get = function (playerID) {
        return Players._PLAYERS[playerID];
    };
    Players.amount = function () {
        return Object.keys(Players._PLAYERS).length;
    };
    Object.defineProperty(Players, "PLAYERS", {
        get: function () {
            return Players._PLAYERS;
        },
        enumerable: true,
        configurable: true
    });
    Players.prototype.getAvaliableTokens = function () {
        //get reserved tokens
        var reservedTokens = Object.Values(Players.PLAYERS).map(function (player) { return player.token(); });
        var allTokens = Object.keys(enums_1.Token);
        return (_.difference(allTokens, reservedTokens));
    };
    /**
     * Maps unique player ID (K, Integer) to player (V, Player)
     */
    Players._PLAYERS = {};
    return Players;
}());
exports.Players = Players;
