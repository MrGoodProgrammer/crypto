import CryptoBlock from "../class/CryptoBlock";
import testConstants from "./constants/test-constants";

describe("class CryptoBlock", () => {
	describe("constructor", () => {
		test("creates a new CryptoBlock", () => {
			jest.spyOn(CryptoBlock.prototype, "computeHash").mockImplementation(() => (testConstants.HASH_3));
			const cryptoBlock = new CryptoBlock(
				testConstants.INDEX_1,
				testConstants.TIMESTAMP_1,
				{
					sender: testConstants.NAME_1,
					receiver: testConstants.NAME_2,
					amount: 50
				},
				testConstants.HASH_1
			);

			expect(cryptoBlock).toStrictEqual(
				expect.objectContaining({
					_index: testConstants.INDEX_1,
					_timestamp: testConstants.TIMESTAMP_1,
					_data: expect.objectContaining({
						sender: testConstants.NAME_1,
						receiver: testConstants.NAME_2,
						amount: 50
					}),
					_hash: testConstants.HASH_3
				})
			);
		});
	});

	describe("computeHash", () => {
		const cryptoBlockData = {
			_index: testConstants.INDEX_1,
			_timestamp: testConstants.TIMESTAMP_1,
			_data: {
					sender: testConstants.NAME_1,
					receiver: testConstants.NAME_2,
					amount: 50
			},
			_precedingHash: testConstants.HASH_1
		};

		const computeHash = CryptoBlock.prototype.computeHash.bind(cryptoBlockData);
		
		test('returns a correct hash', () => {
			expect(computeHash()).toEqual(testConstants.HASH_2);
		});
	});
});
