import { SHA256 } from 'crypto-js';
import ITransactionData from '../interface/ITransactionData';

export default class CryptoBlock {
	private _index: number;
	private _timestamp: number;
	private _data: ITransactionData;
	private _precedingHash: string;
	private _hash: string;

	constructor (index: number, timestamp: number, data: ITransactionData, precedingHash: string = '') {
		this._index = index;
		this._timestamp = timestamp;
		this._data = data;
		this._precedingHash = precedingHash;
		this._hash = this.computeHash();
	}
	
	public computeHash () {
		return SHA256(this._index + this._precedingHash + this._timestamp + JSON.stringify(this._data)).toString();
	}
}