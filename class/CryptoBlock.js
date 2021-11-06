"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_js_1 = require("crypto-js");
var CryptoBlock = /** @class */ (function () {
    function CryptoBlock(payload, difficulty) {
        this._index = payload.index;
        this._timestamp = payload.timestamp;
        this._data = payload.data;
        this._precedingHash = payload.precedingHash;
        this._nonce = 0;
        this._hash = this.proofOfWork(difficulty);
    }
    Object.defineProperty(CryptoBlock.prototype, "hash", {
        get: function () {
            return this._hash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CryptoBlock.prototype, "precedingHash", {
        get: function () {
            return this._precedingHash;
        },
        enumerable: false,
        configurable: true
    });
    CryptoBlock.prototype.computeHash = function () {
        return (0, crypto_js_1.SHA256)(this._index + this._precedingHash + this._timestamp + JSON.stringify(this._data) + this._nonce).toString();
    };
    CryptoBlock.prototype.getInfo = function () {
        return this._data.sender + " sent " + this._data.amount + " " + CryptoBlock.currency + " to " + this._data.receiver + " on " + new Date(this._timestamp).toLocaleDateString() + ".";
    };
    CryptoBlock.prototype.proofOfWork = function (difficulty) {
        var hash;
        do {
            this._nonce++;
            hash = this.computeHash();
        } while (hash.substring(0, difficulty) !== Array(difficulty).fill("0").join(""));
        return hash;
    };
    CryptoBlock.currency = "HUJ";
    return CryptoBlock;
}());
exports.default = CryptoBlock;
