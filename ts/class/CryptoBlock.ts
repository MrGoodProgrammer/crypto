import { SHA256 } from 'crypto-js';
import ITransactionData from '../interface/ITransactionData';
import IHashFeed from '../interface/IHashFeed';

export default class CryptoBlock {
	private _index: number;
	private _timestamp: number;
	private _data: ITransactionData;
	private _precedingHash: string;
	private _hash: string;

	constructor (payload:IHashFeed) {
		this._index = payload.index;
		this._timestamp = payload.timestamp;
		this._data = payload.data;
		this._precedingHash = payload.precedingHash;
		this._hash = CryptoBlock.computeHash(payload);
	}

	get hash() {
		return this._hash;
	}
	
	static computeHash (payload:IHashFeed) {
		return SHA256(payload.index + payload.precedingHash + payload.timestamp + JSON.stringify(payload.data)).toString();
	}
}