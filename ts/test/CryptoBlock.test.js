"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoBlock_1 = __importDefault(require("../class/CryptoBlock"));
var test_constants_1 = __importDefault(require("./constants/test-constants"));
describe("class CryptoBlock", function () {
    describe("constructor", function () {
        test("creates a new CryptoBlock", function () {
            jest.spyOn(CryptoBlock_1.default.prototype, "computeHash").mockImplementation(function () { return (test_constants_1.default.HASH_3); });
            var cryptoBlock = new CryptoBlock_1.default(test_constants_1.default.INDEX_1, test_constants_1.default.TIMESTAMP_1, {
                sender: test_constants_1.default.NAME_1,
                receiver: test_constants_1.default.NAME_2,
                amount: 50
            }, test_constants_1.default.HASH_1);
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
        var cryptoBlockData = {
            _index: test_constants_1.default.INDEX_1,
            _timestamp: test_constants_1.default.TIMESTAMP_1,
            _data: {
                sender: test_constants_1.default.NAME_1,
                receiver: test_constants_1.default.NAME_2,
                amount: 50
            },
            _precedingHash: test_constants_1.default.HASH_1
        };
        var computeHash = CryptoBlock_1.default.prototype.computeHash.bind(cryptoBlockData);
        test('returns a correct hash', function () {
            expect(computeHash()).toEqual(test_constants_1.default.HASH_2);
        });
    });
});
