import CryptoBlockchain from "../class/CryptoBlockchain";
import CryptoBlock from "../class/CryptoBlockchain";
import testConstants from "./constants/test-constants";

describe("class CryptoBlockchain", () => {
	describe("constructor", () => {
		test("creates a new CryptoBlockchain", () => {
			const createGenesisBlock = jest.spyOn(CryptoBlockchain.prototype as any, "createGenesisBlock");
			const blockchain:CryptoBlockchain = new CryptoBlockchain();
			expect(createGenesisBlock).toHaveBeenCalled();
		});
	});

	describe("createGenesisBlock", () => {
		test("creates the first block in blockchain", () => {
			const blockchain:CryptoBlockchain = new CryptoBlockchain();
			expect(blockchain.blockchain).toHaveLength(1);
		});
	});

	describe("getNextIndex", () => {
		test("returns 5", () => {
			const getNextIndex = (CryptoBlockchain.prototype as any).getNextIndex.bind({_blockchain: new Array(5)});
			expect(getNextIndex()).toEqual(5);
		});
	});

	describe("addBlock", () => {
		test("adds three blocks into the blockchain", () => {
			const blockchain = new CryptoBlockchain();
			const transaction1 = {
					sender: testConstants.NAME_1,
					receiver: testConstants.NAME_2,
					amount: 10
			};
			const transaction2 = {
					sender: testConstants.NAME_3,
					receiver: testConstants.NAME_4,
					amount: 200
			};
			const transaction3 = {
					sender: testConstants.NAME_3,
					receiver: testConstants.NAME_1,
					amount: 50
			};
			blockchain.addBlock(transaction1);
			blockchain.addBlock(transaction2);
			blockchain.addBlock(transaction3);
			expect(blockchain.blockchain).toHaveLength(4);
			expect(blockchain.blockchain[1]).toEqual(expect.objectContaining({_data: transaction1}));
		});
	});
});