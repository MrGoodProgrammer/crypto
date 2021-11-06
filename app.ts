import CryptoBlockchain from './class/CryptoBlockchain';

export default (() => {
	const myBlockchain: CryptoBlockchain = new CryptoBlockchain();
	myBlockchain.addBlock({
		sender: 'Angelina Jolie',
		receiver: 'Brad Pitt',
		amount: 70
	});
	myBlockchain.addBlock({
		sender: 'Michael Jordan',
		receiver: 'Scottie Pippen',
		amount: 500000
	});
	myBlockchain.addBlock({
		sender: 'Evgeni Nabokov',
		receiver: 'Ernest Hemingway',
		amount: 70
	});
})();
