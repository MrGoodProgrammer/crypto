"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoBlock_1 = __importDefault(require("./class/CryptoBlock"));
exports.default = (function () {
    var myCrypto = new CryptoBlock_1.default(0, 134481381, { sender: 'Angelina Jolie', receiver: 'Brad Pitt', amount: 70 }, 'asdfsdfasdfasffa7456as6d4f5a4dfa8s1f8asd6f1');
    console.log(myCrypto);
})();
