"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_js_1 = require("crypto-js");
var CryptoBlock = /** @class */ (function () {
    function CryptoBlock(index, timestamp, data, precedingHash) {
        if (precedingHash === void 0) { precedingHash = ''; }
        this._index = index;
        this._timestamp = timestamp;
        this._data = data;
        this._precedingHash = precedingHash;
        this._hash = this.computeHash();
    }
    CryptoBlock.prototype.computeHash = function () {
        return (0, crypto_js_1.SHA256)(this._index + this._precedingHash + this._timestamp + JSON.stringify(this._data)).toString();
    };
    return CryptoBlock;
}());
exports.default = CryptoBlock;
