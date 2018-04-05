import {Block, blockchain, computeHash, generateBlock, genesisBlock, 
    lastBlock, isValidBlock, isValidBlockStructure, computeHashForBlock} from "../src/blockchain";

import { expect, should } from 'chai'
import 'mocha'
// import { it } from "mocha";

describe ('Basic block & blockchain creation and validation', () => {

    // beforeEach(() => {
    //     let bc1 = blockchain
    //     let bc2 = blockchain
    // })

    it('creates a new blockchain containing the genesis block', () => {
        let bc1 = blockchain
        let bc2 = blockchain
        expect(bc1.length).to.not.equal(0)
        expect(bc2.length).to.not.equal(0)
        expect(bc1[0].index).to.equal(0)
        expect(bc2[0].index).to.equal(0)
        expect(bc1[0].hash).to.equal('0123456789abcdef0123456789abcdef0123456789abcdeffedcba9876543210')
        expect(bc2[0].hash).to.equal('0123456789abcdef0123456789abcdef0123456789abcdeffedcba9876543210')
        expect(bc1[0].prevHash).to.be.empty
        expect(bc1[0].data).to.equal("Hello World")
        expect(bc1[0].timestamp).to.be.a('number')
        expect(bc1.length).to.equal(1)
        expect(bc1[1]).to.throw
    });

    it('generates valid blocks', () => {
        let chain1 = blockchain
        let bl2 = generateBlock('Hello Again!')
        let bl3 = generateBlock('Hello There!')
        expect(bl2.index).to.equal(1)
        expect(bl2.prevHash).to.not.be.empty
        expect(bl2.data).to.equal('Hello Again!')
        expect(bl3.data).to.equal('Hello There!')
        expect(bl2.hash).to.equal(computeHash(bl2.index, chain1[0].hash, bl2.timestamp, bl2.data))
    });

    it('... and adds them to the chain', () => {
        let chain1 = blockchain
        let bl2 = generateBlock('Hello Again!')
        let bl3 = generateBlock('Hello There!')
    })

    it('gets the last block each time', () => {
        let chain1 = blockchain
        let bk2 = generateBlock('Hello Again!')
        let bk3 = generateBlock('Hello There!')
        expect(lastBlock(chain1).index).to.equal(0)
        expect(lastBlock(chain1).prevHash).to.be.empty
                
    })

    it('validates a new block', () => {
        let chain1 = blockchain
        let bk1 = generateBlock('Bravo')
        expect(isValidBlock(bk1, chain1[0])).to.be.true
    })

    it('... and determines that it has a correct structure', () => {
        let chain1 = blockchain
        let bk1 = generateBlock('Alpha')
        expect(isValidBlockStructure(chain1[0])).to.be.true
        expect(isValidBlockStructure(bk1)).to.be.true
    })

} )