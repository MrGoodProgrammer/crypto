"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoBlock_1 = __importDefault(require("./CryptoBlock"));
var strings_1 = __importDefault(require("../constants/strings"));
var CryptoBlockchain = /** @class */ (function () {
    function CryptoBlockchain() {
        this._blockchain = [];
        this._genesisCryptoData = {
            sender: strings_1.default.INIT_SENDER_NAME + this.generateRandomNumber(10000),
            receiver: strings_1.default.INIT_RECEIVER_NAME + this.generateRandomNumber(10000),
            amount: this.generateRandomNumber(1000000000000000000000)
        };
        this.createGenesisBlock();
    }
    Object.defineProperty(CryptoBlockchain.prototype, "blockchain", {
        get: function () {
            return this._blockchain;
        },
        enumerable: false,
        configurable: true
    });
    CryptoBlockchain.prototype.createGenesisBlock = function () {
        this._blockchain.push(new CryptoBlock_1.default({
            index: 0,
            timestamp: Date.now(),
            data: this._genesisCryptoData,
            precedingHash: this.generateRandomHash()
        }));
    };
    CryptoBlockchain.prototype.addBlock = function (transactionData) {
        var newBlock = {
            index: this.getNextIndex(),
            data: transactionData,
            timestamp: Date.now(),
            precedingHash: this.getLastHash()
        };
        this.blockchain.push(new CryptoBlock_1.default(newBlock));
        return true;
    };
    CryptoBlockchain.prototype.getLastHash = function () {
        return this.getLastBlock().hash;
    };
    CryptoBlockchain.prototype.getLastBlock = function () {
        return this.blockchain[this.blockchain.length - 1];
    };
    CryptoBlockchain.prototype.generateRandomHash = function () {
        return CryptoBlock_1.default.computeHash({
            index: this.generateRandomNumber(10000),
            timestamp: Date.now(),
            data: this._genesisCryptoData,
            precedingHash: this.generateRandomNumber(10000).toString()
        });
    };
    CryptoBlockchain.prototype.generateRandomNumber = function (max) {
        return Math.round(Math.random() * max);
    };
    CryptoBlockchain.prototype.getNextIndex = function () {
        return this._blockchain.length;
    };
    return CryptoBlockchain;
}());
exports.default = CryptoBlockchain;
