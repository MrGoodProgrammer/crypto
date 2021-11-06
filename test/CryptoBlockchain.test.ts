import CryptoBlockchain from "../class/CryptoBlockchain";
import testConstants from "./constant/test-constants";
import CryptoBlockchainHacked from "./class/CryptoBlockchainHacked";

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

function createBlockchainWithBlocks():CryptoBlockchain {
	const blockchain = new CryptoBlockchain(testConstants.EASY_DIFFICULTY);
	blockchain.addBlock(transaction1);
	blockchain.addBlock(transaction2);
	blockchain.addBlock(transaction3);

	return blockchain;
}

describe("class CryptoBlockchain", () => {
	describe("constructor", () => {
		test("creates a new CryptoBlockchain", () => {
			const createGenesisBlock = jest.spyOn(CryptoBlockchain.prototype as any, "createGenesisBlock");
			const blockchain: CryptoBlockchain = new CryptoBlockchain(testConstants.EASY_DIFFICULTY);
			expect(createGenesisBlock).toHaveBeenCalled();
		});
	});

	describe("createGenesisBlock", () => {
		test("creates the first block in blockchain", () => {
			const blockchain: CryptoBlockchain = new CryptoBlockchain(testConstants.EASY_DIFFICULTY);
			expect(blockchain.blockchain).toHaveLength(1);
		});
	});

	describe("getNextIndex", () => {
		test("returns 5", () => {
			const getNextIndex = (CryptoBlockchain.prototype as any).getNextIndex.bind({ _blockchain: new Array(5) });
			expect(getNextIndex()).toEqual(5);
		});
	});

	describe("addBlock", () => {
		test("adds three blocks into the blockchain", () => {
			const blockchain = createBlockchainWithBlocks();
			expect(blockchain.blockchain).toHaveLength(4);
			expect(blockchain.blockchain[1]).toEqual(expect.objectContaining({ _data: transaction1 }));
		});
	});

	describe("checkChainValidity", () => {
		let blockchain:CryptoBlockchain;
		beforeEach(() => {
			blockchain = createBlockchainWithBlocks();
		});
		
		test("returns true", () => {
			expect(blockchain.checkValidity()).toEqual(true);
		});

		test("returns false when second block is hacked", () => {
			let hackedBlockchain = new CryptoBlockchainHacked(testConstants.HARD_DIFFICULTY);
			hackedBlockchain.addBlock(transaction1);
			hackedBlockchain.addBlock(transaction2);
			hackedBlockchain.addBlock(transaction3);
			expect(hackedBlockchain.checkValidity()).toEqual(true);
			hackedBlockchain.hackBlockchain(1);
			expect(hackedBlockchain.checkValidity()).toEqual(false);
		});

		test("returns false when the first block is hacked", () => {
			let hackedBlockchain = new CryptoBlockchainHacked(testConstants.HARD_DIFFICULTY);
			hackedBlockchain.addBlock(transaction1);
			hackedBlockchain.addBlock(transaction2);
			hackedBlockchain.addBlock(transaction3);
			expect(hackedBlockchain.checkValidity()).toEqual(true);
			hackedBlockchain.hackBlockchain(0);
			expect(hackedBlockchain.checkValidity()).toEqual(false);
		});
	});

	describe("getLastBlock", () => {
		test("returns last block", () => {
			const blockchain = createBlockchainWithBlocks();
			const getLastBlock = (CryptoBlockchain.prototype as any).getLastBlock.bind(blockchain);
			expect(getLastBlock()).toEqual(expect.objectContaining({_data: transaction3}));
		});

		test("returns undefined when blockchain is empty", () => {
			const getLastBlock = (CryptoBlockchain.prototype as any).getLastBlock.bind({ blockchain: []});
			expect(getLastBlock()).toEqual(undefined);
		});
	});
});