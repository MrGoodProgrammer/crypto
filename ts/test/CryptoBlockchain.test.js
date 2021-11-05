"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoBlockchain_1 = __importDefault(require("../class/CryptoBlockchain"));
var test_constants_1 = __importDefault(require("./constants/test-constants"));
describe("class CryptoBlockchain", function () {
    describe("constructor", function () {
        test("creates a new CryptoBlockchain", function () {
            var createGenesisBlock = jest.spyOn(CryptoBlockchain_1.default.prototype, "createGenesisBlock");
            var blockchain = new CryptoBlockchain_1.default();
            expect(createGenesisBlock).toHaveBeenCalled();
        });
    });
    describe("createGenesisBlock", function () {
        test("creates the first block in blockchain", function () {
            var blockchain = new CryptoBlockchain_1.default();
            expect(blockchain.blockchain).toHaveLength(1);
        });
    });
    describe("getNextIndex", function () {
        test("returns 5", function () {
            var getNextIndex = CryptoBlockchain_1.default.prototype.getNextIndex.bind({ _blockchain: new Array(5) });
            expect(getNextIndex()).toEqual(5);
        });
    });
    describe("addBlock", function () {
        test("adds three blocks into the blockchain", function () {
            var blockchain = new CryptoBlockchain_1.default();
            var transaction1 = {
                sender: test_constants_1.default.NAME_1,
                receiver: test_constants_1.default.NAME_2,
                amount: 10
            };
            var transaction2 = {
                sender: test_constants_1.default.NAME_3,
                receiver: test_constants_1.default.NAME_4,
                amount: 200
            };
            var transaction3 = {
                sender: test_constants_1.default.NAME_3,
                receiver: test_constants_1.default.NAME_1,
                amount: 50
            };
            blockchain.addBlock(transaction1);
            blockchain.addBlock(transaction2);
            blockchain.addBlock(transaction3);
            expect(blockchain.blockchain).toHaveLength(4);
            expect(blockchain.blockchain[1]).toEqual(expect.objectContaining({ _data: transaction1 }));
        });
    });
});
