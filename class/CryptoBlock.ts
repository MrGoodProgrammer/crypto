import { SHA256 } from 'crypto-js';
import ITransactionData from '../interface/ITransactionData';
import IHashFeed from '../interface/IHashFeed';

export default class CryptoBlock {
	private _index: number;
	private _timestamp: number;
	private _data: ITransactionData;
	private _precedingHash: string;
	private _hash: string;
	private _nonce: number;
	static currency: string = "HUJ";

	constructor (payload:IHashFeed, difficulty: number) {
		this._index = payload.index;
		this._timestamp = payload.timestamp;
		this._data = payload.data;
		this._precedingHash = payload.precedingHash;
		this._nonce = 0;
		this._hash = this.proofOfWork(difficulty);
	}

	get hash() {
		return this._hash;
	}

	get precedingHash() {
		return this._precedingHash;
	}

	public computeHash():string {
		return SHA256(this._index + this._precedingHash + this._timestamp + JSON.stringify(this._data) + this._nonce).toString();
	}

	public getInfo():string {
		return `${this._data.sender} sent ${this._data.amount} ${CryptoBlock.currency} to ${this._data.receiver} on ${new Date(this._timestamp).toLocaleDateString()}.`; 
	}

	private proofOfWork(difficulty:number) {
		let hash;

		do {
			this._nonce++;
			hash = this.computeHash();
		} while (hash.substring(0, difficulty) !== Array(difficulty).fill("0").join(""));

		return hash;
	}
}