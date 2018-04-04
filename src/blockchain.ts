import * as CryptoJS from 'crypto-js' 


class Block {
    public index: number
    public hash: string
    public prevHash: string
    public timestamp: number
    public data: string
    
    constructor(index: number, hash: string, prevHash: string, timestamp:number, data: string) {
        this.index = index
        this.prevHash = prevHash
        this.timestamp = timestamp
        this.data = data
        this.hash = hash
    }   
}

const computeHash = (index:number, prevHash:string, timestamp:number, data:string):string => 
    CryptoJS.SHA256(index + prevHash + timestamp + data).toString()

const calculateHashForBlock = (block : Block): string =>
    CryptoJS.SHA256(block.index + block.prevHash + block.timestamp + block.data).toString();

// const genesisBlock: Block  = new Block (0, '', '', Date.now(), '')
const genesisBlock : Block  = 
    new Block (0, '0123456789abcdef0123456789abcdef0123456789abcdeffedcba9876543210', null, new Date().getTime(), 'Hello World')

const generateBlock = (blockData : string) => {
    const prevBlock : Block = lastBlock()
    const nextIndex : number = prevBlock.index + 1
    const nextTimestamp : number = new Date().getTime() / 1000
    const nextHash : string = computeHash(nextIndex, prevBlock.hash, nextTimestamp, blockData)
    const newBlock : Block = new Block(nextIndex, nextHash, prevBlock.hash, nextTimestamp, blockData)
    return newBlock
}

// and finally the blockchain : a list of blocks
const blockchain : Block[] = [genesisBlock]


const lastBlock = () : Block  => {
    return blockchain[blockchain.length - 1]
}

const isValidBlock = (newBlock : Block, prevBlock : Block) => {
    if (prevBlock.index + 1 !== newBlock.index) {
        console.log(" Invalid index ")
        return false
    }
    else if (prevBlock.hash !== newBlock.prevHash ) {
        console.log( " Invalid hash in previous block ")
        return false
    } 
    else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log(typeof (newBlock.hash) + ' ' + typeof calculateHashForBlock(newBlock));
        console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash)
        return false
    }
    return true
}

export {Block, blockchain, computeHash, generateBlock, genesisBlock, lastBlock, isValidBlock, calculateHashForBlock}