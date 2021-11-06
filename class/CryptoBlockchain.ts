import CryptoBlock from "./CryptoBlock";
import strings from "../constant/strings";
import ITransactionData from "../interface/ITransactionData";
import IHashFeed from "../interface/IHashFeed";

export default class CryptoBlockchain {
	protected _blockchain:CryptoBlock[];
	protected _difficulty:number;

	constructor(difficulty = 4) {
		this._blockchain = [];
		this._difficulty = difficulty;
		this.createGenesisBlock();
	}

	get blockchain() {
		return this._blockchain;
	}
	
	private createGenesisBlock():void {
		this.addBlock({
			sender: `${strings.INIT_SENDER_NAME} ${this.generateRandomNumber(10000)}`, 
			receiver: `${strings.INIT_RECEIVER_NAME} ${this.generateRandomNumber(10000)}`, 
			amount: 1
		});
	}

	public addBlock(transactionData:ITransactionData):boolean {
		const newBlock:IHashFeed = {
			index: this.getNextIndex(),
			data: transactionData,
			timestamp: Date.now(),
			precedingHash: this.getLastHash()
		};
		this.blockchain.push(new CryptoBlock(newBlock, this._difficulty));
		return true;
	}

	public checkValidity():boolean {
		for (let i = 0; i < this._blockchain.length - 1; i++) {
			if (this._blockchain[i].computeHash() !== this._blockchain[i + 1].precedingHash) {
				return false;
			}
		}
		return true;
	}

	private generateRandomNumber(max:number):number {
		return Math.round(Math.random() * max);
	}

	private getNextIndex():number {
		return this._blockchain.length;
	}

	private getLastHash():string {
		const lastBlock = this.getLastBlock();
		return lastBlock ? lastBlock.hash : "";
	}

	private getLastBlock():CryptoBlock {
		return this.blockchain[this.blockchain.length - 1];
	}

	public writeOut():void {
		for (let block of this._blockchain) {
			console.log(block.getInfo());
		}
	}
}