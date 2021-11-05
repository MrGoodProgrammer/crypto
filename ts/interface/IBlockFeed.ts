import ITransactionData from "./ITransactionData";

export default interface IBlockFeed {
	timestamp: number;
	data: ITransactionData;
}