"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoBlock_1 = __importDefault(require("../class/CryptoBlock"));
var test_constants_1 = __importDefault(require("./constant/test-constants"));
describe("class CryptoBlock", function () {
    describe("constructor", function () {
        test("creates a new CryptoBlock", function () {
            jest.spyOn(CryptoBlock_1.default.prototype, "proofOfWork").mockImplementation(function () { return (test_constants_1.default.HASH_3); });
            var cryptoBlock = new CryptoBlock_1.default({
                index: test_constants_1.default.INDEX_1,
                timestamp: test_constants_1.default.TIMESTAMP_1,
                data: {
                    sender: test_constants_1.default.NAME_1,
                    receiver: test_constants_1.default.NAME_2,
                    amount: 50
                },
                precedingHash: test_constants_1.default.HASH_1
            }, test_constants_1.default.EASY_DIFFICULTY);
            expect(cryptoBlock).toStrictEqual(expect.objectContaining({
                _index: test_constants_1.default.INDEX_1,
                _timestamp: test_constants_1.default.TIMESTAMP_1,
                _data: expect.objectContaining({
                    sender: test_constants_1.default.NAME_1,
                    receiver: test_constants_1.default.NAME_2,
                    amount: 50
                }),
                _hash: test_constants_1.default.HASH_3
            }));
        });
    });
    describe("computeHash", function () {
        jest.spyOn(CryptoBlock_1.default.prototype, "proofOfWork");
        var cryptoBlock = new CryptoBlock_1.default({
            index: 1,
            timestamp: 12345678,
            data: {
                sender: test_constants_1.default.NAME_1,
                receiver: test_constants_1.default.NAME_2,
                amount: 50
            },
            precedingHash: "xyz"
        }, test_constants_1.default.EASY_DIFFICULTY);
        expect(cryptoBlock.computeHash()).toEqual("086110d436a78146d1974db7a479577634ecd5f5ce939d332cb2b3928b6d3337");
    });
});
