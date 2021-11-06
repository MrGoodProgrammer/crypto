"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoBlockchain_1 = __importDefault(require("../class/CryptoBlockchain"));
var test_constants_1 = __importDefault(require("./constant/test-constants"));
var CryptoBlockchainHacked_1 = __importDefault(require("./class/CryptoBlockchainHacked"));
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
function createBlockchainWithBlocks() {
    var blockchain = new CryptoBlockchain_1.default(test_constants_1.default.EASY_DIFFICULTY);
    blockchain.addBlock(transaction1);
    blockchain.addBlock(transaction2);
    blockchain.addBlock(transaction3);
    return blockchain;
}
describe("class CryptoBlockchain", function () {
    describe("constructor", function () {
        test("creates a new CryptoBlockchain", function () {
            var createGenesisBlock = jest.spyOn(CryptoBlockchain_1.default.prototype, "createGenesisBlock");
            var blockchain = new CryptoBlockchain_1.default(test_constants_1.default.EASY_DIFFICULTY);
            expect(createGenesisBlock).toHaveBeenCalled();
        });
    });
    describe("createGenesisBlock", function () {
        test("creates the first block in blockchain", function () {
            var blockchain = new CryptoBlockchain_1.default(test_constants_1.default.EASY_DIFFICULTY);
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
            var blockchain = createBlockchainWithBlocks();
            expect(blockchain.blockchain).toHaveLength(4);
            expect(blockchain.blockchain[1]).toEqual(expect.objectContaining({ _data: transaction1 }));
        });
    });
    describe("checkChainValidity", function () {
        var blockchain;
        beforeEach(function () {
            blockchain = createBlockchainWithBlocks();
        });
        test("returns true", function () {
            expect(blockchain.checkValidity()).toEqual(true);
        });
        test("returns false when second block is hacked", function () {
            var hackedBlockchain = new CryptoBlockchainHacked_1.default(test_constants_1.default.HARD_DIFFICULTY);
            hackedBlockchain.addBlock(transaction1);
            hackedBlockchain.addBlock(transaction2);
            hackedBlockchain.addBlock(transaction3);
            expect(hackedBlockchain.checkValidity()).toEqual(true);
            hackedBlockchain.hackBlockchain(1);
            expect(hackedBlockchain.checkValidity()).toEqual(false);
        });
        test("returns false when the first block is hacked", function () {
            var hackedBlockchain = new CryptoBlockchainHacked_1.default(test_constants_1.default.HARD_DIFFICULTY);
            hackedBlockchain.addBlock(transaction1);
            hackedBlockchain.addBlock(transaction2);
            hackedBlockchain.addBlock(transaction3);
            expect(hackedBlockchain.checkValidity()).toEqual(true);
            hackedBlockchain.hackBlockchain(0);
            expect(hackedBlockchain.checkValidity()).toEqual(false);
        });
    });
    describe("getLastBlock", function () {
        test("returns last block", function () {
            var blockchain = createBlockchainWithBlocks();
            var getLastBlock = CryptoBlockchain_1.default.prototype.getLastBlock.bind(blockchain);
            expect(getLastBlock()).toEqual(expect.objectContaining({ _data: transaction3 }));
        });
        test("returns undefined when blockchain is empty", function () {
            var getLastBlock = CryptoBlockchain_1.default.prototype.getLastBlock.bind({ blockchain: [] });
            expect(getLastBlock()).toEqual(undefined);
        });
    });
});
