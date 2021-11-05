import CryptoBlock from "../class/CryptoBlock";
import testConstants from "./constants/test-constants";

describe("class CryptoBlock", () => {
	describe("constructor", () => {
		test("creates a new CryptoBlock", () => {
			jest.spyOn(CryptoBlock, "computeHash").mockImplementation(() => (testConstants.HASH_3));
			const cryptoBlock:CryptoBlock = new CryptoBlock({
				index: testConstants.INDEX_1,
				timestamp: testConstants.TIMESTAMP_1,
				data: {
					sender: testConstants.NAME_1,
					receiver: testConstants.NAME_2,
					amount: 50
				},
				precedingHash: testConstants.HASH_1
			});

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
		const cryptoBlock = {
			index: testConstants.INDEX_1,
			timestamp: testConstants.TIMESTAMP_1,
			data: {
					sender: testConstants.NAME_1,
					receiver: testConstants.NAME_2,
					amount: 50
			},
			precedingHash: testConstants.HASH_1
		};
		
		test('returns a correct hash', () => {
			expect(CryptoBlock.computeHash(cryptoBlock));
		});
	});
});
