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

    computeHash (index:number, prevHash:string, timestamp:number, data:string) : string {
        return CryptoJS.SHA256(index + prevHash + timestamp + data).toString()
    }

    isValidBlockStructure ( block : Block ) : boolean {
        return typeof block.index === 'number'
            && typeof block.hash === 'string'
            && typeof block.prevHash === 'string'
            && typeof block.timestamp === 'number'
            && typeof block.data === 'string'
    }

    to_string () : string {
        return "Block: {index : " + this.index + ", hash : " + this.hash + ", prevHash : " + this.prevHash + 
                ", time: " + this.timestamp + ", payload: " + this.data + "}"
    }
}

export {Block}