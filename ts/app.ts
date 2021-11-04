import CryptoBlock from './class/CryptoBlock';

export default (() => {
	const myCrypto: CryptoBlock = new CryptoBlock(0, 134481381, {sender: 'Angelina Jolie', receiver: 'Brad Pitt', amount: 70}, 'asdfsdfasdfasffa7456as6d4f5a4dfa8s1f8asd6f1');

	console.log(myCrypto);
})();
