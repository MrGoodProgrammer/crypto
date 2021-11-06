import CryptoBlock from "../class/CryptoBlock";
import testConstants from "./constant/test-constants";

describe("class CryptoBlock", () => {
	describe("constructor", () => {
		test("creates a new CryptoBlock", () => {
			jest.spyOn(CryptoBlock.prototype as any, "proofOfWork").mockImplementation(() => (testConstants.HASH_3));
			const cryptoBlock:CryptoBlock = new CryptoBlock(
				{
					index: testConstants.INDEX_1,
					timestamp: testConstants.TIMESTAMP_1,
					data: {
						sender: testConstants.NAME_1,
						receiver: testConstants.NAME_2,
						amount: 50
					},
					precedingHash: testConstants.HASH_1
				},
				testConstants.EASY_DIFFICULTY
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
		jest.spyOn(CryptoBlock.prototype as any, "proofOfWork");
		const cryptoBlock = new CryptoBlock(
			{
				index: 1,
				timestamp: 12345678,
				data: {
					sender: testConstants.NAME_1,
					receiver: testConstants.NAME_2,
					amount: 50
				},
				precedingHash: "xyz"
			},
			testConstants.EASY_DIFFICULTY
		);

		expect(cryptoBlock.computeHash()).toEqual("086110d436a78146d1974db7a479577634ecd5f5ce939d332cb2b3928b6d3337");
	});
});
