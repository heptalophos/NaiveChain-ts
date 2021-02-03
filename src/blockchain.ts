import * as CryptoJS from "crypto-js"; 
import { Block } from "./block";

export default class Blockchain {

    public chain : Block[] = [];

    constructor () {
        // populate the chain with the genesisBlock
        this.chain.push(this.genesisBlock());
    }

    genesisBlock ():Block {
        return new Block (0, "0123456789abcdef0123456789abcdef0123456789abcdeffedcba9876543210", null, new Date().getTime(), "Hello World");
    }

    lastBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    computeHash (index:number, prevHash:string, timestamp:number, data:string):string {
        return CryptoJS.SHA256(index + prevHash + timestamp + data).toString();
    }

    isValidBlock (newBlock:Block, prevBlock:Block):boolean {
        if (prevBlock.index + 1 !== newBlock.index) {
            console.log(" Invalid index ");
            return false;
        } else if (prevBlock.hash !== newBlock.prevHash ) {
            console.log( " Invalid hash in previous block ");
            return false;
        } else if (this.computeHashForBlock(newBlock) !== newBlock.hash) {
            console.log(typeof (newBlock.hash) + " " + typeof this.computeHashForBlock(newBlock));
            console.log("invalid hash: " + this.computeHashForBlock(newBlock) + " --- " + newBlock.hash);
            return false;
        }
        return true;
    }

    addBlock (block:Block, chain:Block[]):void {
        if(this.isValidBlock(block, this.lastBlock())) {
            chain.push(block);
        }
    }

    computeHashForBlock (block:Block):string {
        return Block.computeHash(
            block.index, block.prevHash, block.timestamp, block.data);
    }

    generateBlock (blockData:string):Block {
        const prevBlock:Block = this.lastBlock();
        const nextIndex:number = prevBlock.index + 1;
        const nextTimestamp:number = new Date().getTime() / 1000;
        const nextHash:string = 
            this.computeHash(nextIndex, prevBlock.hash, nextTimestamp, blockData);
        const newBlock:Block = 
            new Block(nextIndex, nextHash, prevBlock.hash, nextTimestamp, blockData);
        this.addBlock(newBlock, this.chain);
        return newBlock;
    }
}