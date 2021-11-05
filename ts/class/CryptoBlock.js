"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_js_1 = require("crypto-js");
var CryptoBlock = /** @class */ (function () {
    function CryptoBlock(payload) {
        this._index = payload.index;
        this._timestamp = payload.timestamp;
        this._data = payload.data;
        this._precedingHash = payload.precedingHash;
        this._hash = CryptoBlock.computeHash(payload);
    }
    Object.defineProperty(CryptoBlock.prototype, "hash", {
        get: function () {
            return this._hash;
        },
        enumerable: false,
        configurable: true
    });
    CryptoBlock.computeHash = function (payload) {
        return (0, crypto_js_1.SHA256)(payload.index + payload.precedingHash + payload.timestamp + JSON.stringify(payload.data)).toString();
    };
    return CryptoBlock;
}());
exports.default = CryptoBlock;
