"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoBlock_1 = __importDefault(require("../../class/CryptoBlock"));
var CryptoBlockchain_1 = __importDefault(require("../../class/CryptoBlockchain"));
var test_constants_1 = __importDefault(require("../constant/test-constants"));
var CryptoBlockchainHacked = /** @class */ (function (_super) {
    __extends(CryptoBlockchainHacked, _super);
    function CryptoBlockchainHacked(difficulty) {
        return _super.call(this, difficulty) || this;
    }
    CryptoBlockchainHacked.prototype.hackBlockchain = function (arrayIndex) {
        this._blockchain[arrayIndex] = new CryptoBlock_1.default({
            index: 11,
            data: {
                sender: test_constants_1.default.NAME_4,
                receiver: test_constants_1.default.NAME_1,
                amount: 2000000
            },
            timestamp: Date.now(),
            precedingHash: (this._blockchain[arrayIndex - 1]) ? this._blockchain[arrayIndex - 1].hash : ""
        }, this._difficulty);
    };
    return CryptoBlockchainHacked;
}(CryptoBlockchain_1.default));
exports.default = CryptoBlockchainHacked;
