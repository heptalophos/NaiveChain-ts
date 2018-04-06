import {Blockchain} from "../src/blockchain"
import {Block} from "../src/block"

import { expect, should } from 'chai'
import 'mocha'


describe ('Basic block & blockchain creation and validation', () => {

    let chain1, chain2

    beforeEach(() => {
        chain1 = new Blockchain
        chain2 = new Blockchain
    })

    it('creates a new blockchain containing the genesis block', () => {
        expect(chain1.length).to.not.equal(0)
        expect(chain2.length).to.not.equal(0)
        expect(chain1[0].index).to.equal(0)
        expect(chain2[0].index).to.equal(0)
        expect(chain1[0].hash).to.equal('0123456789abcdef0123456789abcdef0123456789abcdeffedcba9876543210')
        expect(chain2[0].hash).to.equal('0123456789abcdef0123456789abcdef0123456789abcdeffedcba9876543210')
        expect(chain1[0].prevHash).to.be.empty
        expect(chain1[0].data).to.equal("Hello World")
        expect(chain1[0].timestamp).to.be.a('number')
        expect(chain1.length).to.equal(1)
        expect(chain1[1]).to.throw
    });

    it('generates valid blocks', () => {
        let bl2 = generateBlock('Hello Again!', chain1)
        let bl3 = generateBlock('Hello There!', chain2)
        expect(bl2.index).to.equal(1)
        expect(bl2.prevHash).to.not.be.empty
        console.log("Chain1: " + bl2.to_string())
        // expect(chain1[1].data).to.equal('Hello Again!')
        console.log("Chain2: " + bl3.to_string())
        // expect(chain2[1].data).to.equal('Hello There!')
        expect(bl2.hash).to.equal(computeHash(bl2.index, chain1[0].hash, bl2.timestamp, bl2.data))
    });

    it('... and adds them to the chain', () => {
        let bl2 = generateBlock('Hello Again!', chain1)
        let bl3 = generateBlock('Hello There!', chain2)
    })

    it('gets the last block each time', () => {
        let bk2 = generateBlock('Hello Again!', chain1)
        let bk3 = generateBlock('Hello There!', chain2)
        console.log(lastBlock(chain2).index)
        expect(lastBlock(chain1).index).to.equal(1)
        expect(lastBlock(chain1).prevHash).to.not.be.empty
        expect(lastBlock(chain2).data).to.equal("Hello There!")
                
    })

    it('validates a new block', () => {
        let bk1 = generateBlock('Bravo', chain1)
        expect(isValidBlock(bk1, chain1[0])).to.be.true
    })

    it('... and determines that it has a correct structure', () => {
        let bk1 = generateBlock('Alpha', chain1)
        expect(isValidBlockStructure(chain1[0])).to.be.true
        expect(isValidBlockStructure(bk1)).to.be.true
    })

    afterEach(() => {
        let chain1 = null 
        let chain2 = null
    })

} )