"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoBlockchain_1 = __importDefault(require("./class/CryptoBlockchain"));
exports.default = (function () {
    var myBlockchain = new CryptoBlockchain_1.default();
    myBlockchain.addBlock({
        sender: 'Angelina Jolie',
        receiver: 'Brad Pitt',
        amount: 70
    });
    myBlockchain.addBlock({
        sender: 'Michael Jordan',
        receiver: 'Scottie Pippen',
        amount: 500000
    });
    myBlockchain.addBlock({
        sender: 'Evgeni Nabokov',
        receiver: 'Ernst Hemingway',
        amount: 70
    });
    console.log(myBlockchain.blockchain);
})();
