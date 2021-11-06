"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoBlock_1 = __importDefault(require("./CryptoBlock"));
var strings_1 = __importDefault(require("../constant/strings"));
var CryptoBlockchain = /** @class */ (function () {
    function CryptoBlockchain(difficulty) {
        if (difficulty === void 0) { difficulty = 4; }
        this._blockchain = [];
        this._difficulty = difficulty;
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
        this.addBlock({
            sender: strings_1.default.INIT_SENDER_NAME + " " + this.generateRandomNumber(10000),
            receiver: strings_1.default.INIT_RECEIVER_NAME + " " + this.generateRandomNumber(10000),
            amount: 1
        });
    };
    CryptoBlockchain.prototype.addBlock = function (transactionData) {
        var newBlock = {
            index: this.getNextIndex(),
            data: transactionData,
            timestamp: Date.now(),
            precedingHash: this.getLastHash()
        };
        this.blockchain.push(new CryptoBlock_1.default(newBlock, this._difficulty));
        return true;
    };
    CryptoBlockchain.prototype.checkValidity = function () {
        for (var i = 0; i < this._blockchain.length - 1; i++) {
            if (this._blockchain[i].computeHash() !== this._blockchain[i + 1].precedingHash) {
                return false;
            }
        }
        return true;
    };
    CryptoBlockchain.prototype.generateRandomNumber = function (max) {
        return Math.round(Math.random() * max);
    };
    CryptoBlockchain.prototype.getNextIndex = function () {
        return this._blockchain.length;
    };
    CryptoBlockchain.prototype.getLastHash = function () {
        var lastBlock = this.getLastBlock();
        return lastBlock ? lastBlock.hash : "";
    };
    CryptoBlockchain.prototype.getLastBlock = function () {
        return this.blockchain[this.blockchain.length - 1];
    };
    CryptoBlockchain.prototype.writeOut = function () {
        for (var _i = 0, _a = this._blockchain; _i < _a.length; _i++) {
            var block = _a[_i];
            console.log(block.getInfo());
        }
    };
    return CryptoBlockchain;
}());
exports.default = CryptoBlockchain;
