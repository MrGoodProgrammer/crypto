import IBlockFeed from "./IBlockFeed";

export default interface IHashFeed extends IBlockFeed {
	index: number;
	precedingHash: string;
}