import CryptoBlock from "../../class/CryptoBlock";
import CryptoBlockchain from "../../class/CryptoBlockchain";
import testConstants from "../constant/test-constants";

export default class CryptoBlockchainHacked extends CryptoBlockchain {
	constructor(difficulty:number) {
		super(difficulty);
	}

	public hackBlockchain(arrayIndex: number) {
		this._blockchain[arrayIndex] = new CryptoBlock(
			{
				index: 11,
				data: {
					sender: testConstants.NAME_4,
					receiver: testConstants.NAME_1,
					amount: 2000000
				},
				timestamp: Date.now(),
				precedingHash: (this._blockchain[arrayIndex - 1]) ? this._blockchain[arrayIndex - 1].hash : ""
			},
			this._difficulty
		);
	}
}