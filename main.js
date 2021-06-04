const CryptoCoding = require('crypto-js');
class Block {
    constructor(index, timestamp, data, peviousHash = "0") {
        let dat = new Date();
        let tim = (dat.getFullYear().toString() + "/" + (dat.getMonth() + 1).toString() + "/" + dat.getDate().toString()).toString();

        this.index = index;
        if (timestamp == null)
            this.timestamp = tim;
        else
            this.timestamp = timestamp;
        this.data = data;
        this.peviousHash = peviousHash;
        this.HASH = this.computeHASH();
        this.nonce = 0;
    }
    computeHASH() {
        return CryptoCoding.MD5(
            this.index + this.peviousHash + this.timestamp + JSON.stringify(this.data)
        ).toString();
    }
    Mining(difficulty) {
        while (this.HASH.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.HASH = this.computeHASH();
        }
    }
}
class BlockChain {
    constructor() {
        this.blockchain = [this.startGenerateBlock()];
        this.difficulty = 3;
    }
    startGenerateBlock() {
        let dat = new Date();
        let tim = (dat.getFullYear().toString() + "/" + (dat.getMonth() + 1).toString() + "/" + dat.getDate().toString()).toString();
        return new Block(0, tim, "Initialize the Very First Block");
    }
    getLastBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock) {
        newBlock.peviousHash = this.getLastBlock().HASH;
        // newBlock.HASH = newBlock.computeHASH();
        newBlock.Mining(this.difficulty);
        this.blockchain.push(newBlock);
    }
    checkIfBlockChainIsValid() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const peviousBlock = this.blockchain[i - 1];

            if (currentBlock.HASH !== currentBlock.computeHASH()) {
                return false;
            }
            if (currentBlock.peviousHash !== peviousBlock.HASH) {
                return false;
            }
        }
        return true;
    }
}

let MyChain = new BlockChain();
MyChain.addNewBlock(new Block(1, null, { sender: "Miner", reciever: "Me", value: 0.11 }));
// MyChain.addNewBlock(new Block(2, null, { sender: "John", reciever: "Me", value: 0.51 }));
console.log(JSON.stringify(MyChain, null, 4));