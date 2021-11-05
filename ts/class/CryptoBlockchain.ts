import CryptoBlock from "./CryptoBlock";
import strings from "../constants/strings";
import ITransactionData from "../interface/ITransactionData";
import IHashFeed from "../interface/IHashFeed";

export default class CryptoBlockchain {
	private _blockchain:CryptoBlock[];
	private _genesisCryptoData:ITransactionData;

	constructor() {
		this._blockchain = [];
		this._genesisCryptoData = {
			sender: `${strings.INIT_SENDER_NAME} ${this.generateRandomNumber(10000)}`, 
			receiver: `${strings.INIT_RECEIVER_NAME} ${this.generateRandomNumber(10000)}`, 
			amount: this.generateRandomNumber(10000000000)
		};
		this.createGenesisBlock();
	}

	get blockchain() {
		return this._blockchain;
	}
	
	private createGenesisBlock():void {
		this._blockchain.push(
			new CryptoBlock({
				index: 0,
				timestamp: Date.now(),
				data: this._genesisCryptoData,
				precedingHash: this.generateRandomHash()
			})
		)
	}

	public addBlock(transactionData:ITransactionData):boolean {
		const newBlock:IHashFeed = {
			index: this.getNextIndex(),
			data: transactionData,
			timestamp: Date.now(),
			precedingHash: this.getLastHash()
		};
		this.blockchain.push(new CryptoBlock(newBlock));
		return true;
	}

	private getLastHash():string {
		return this.getLastBlock().hash;
	}

	private getLastBlock():CryptoBlock {
		return this.blockchain[this.blockchain.length - 1];
	}

	private generateRandomHash():string {
		return CryptoBlock.computeHash({
			index: this.generateRandomNumber(10000),
			timestamp: Date.now(),
			data: this._genesisCryptoData,
			precedingHash: this.generateRandomNumber(10000).toString()
		});
	}

	private generateRandomNumber(max:number):number {
		return Math.round(Math.random() * max);
	}

	private getNextIndex():number {
		return this._blockchain.length;
	}
}