import {Blockchain} from "../src/blockchain"
import {Block} from "../src/block"

import { expect, should } from 'chai'
import 'mocha'


describe ('Blockchain creation and validation', () => {

    let chain1, chain2

    beforeEach(() => {
        chain1 = new Blockchain()
        chain2 = new Blockchain()
    })

    it('creates a new blockchain containing the genesis block', () => {
        expect(chain1.chain.length).to.not.equal(0)
        expect(chain2.chain.length).to.not.equal(0)
        expect(chain1.chain[0].index).to.equal(0)
        expect(chain2.chain[0].index).to.equal(0)
        expect(chain1.chain[0].hash).to.equal('0123456789abcdef0123456789abcdef0123456789abcdeffedcba9876543210')
        expect(chain2.chain[0].hash).to.equal('0123456789abcdef0123456789abcdef0123456789abcdeffedcba9876543210')
        expect(chain1.chain[0].prevHash).to.be.null
        expect(chain1.chain[0].data).to.equal("Hello World")
        expect(chain1.chain[0].timestamp).to.be.a('number')
        expect(chain1.chain.length).to.equal(1)
        expect(chain1.chain[1]).to.throw
    });

    it('generates valid blocks', () => {
        let bl2 = chain1.generateBlock('Hello Again!')
        let bl3 = chain2.generateBlock('Hello There!')
        expect(bl2.index).to.equal(1)
        expect(bl2.prevHash).to.not.be.empty
        expect(chain1.chain[1].data).to.equal('Hello Again!')
        expect(chain2.chain[1].data).to.equal('Hello There!')
        expect(bl2.hash).to.equal(Block.computeHash(bl2.index, chain1.chain[0].hash, bl2.timestamp, bl2.data))
    });

    it('... and adds them to the chain', () => {
        let bl2 = chain1.generateBlock('Hello Again!')
        let bl3 = chain2.generateBlock('Hello There!')
    })

    it('gets the last block each time', () => {
        let bk2 = chain1.generateBlock('Hello Again!')
        let bk3 = chain2.generateBlock('Hello There!')
        expect(chain1.lastBlock().index).to.equal(1)
        expect(chain1.lastBlock().prevHash).to.not.be.null
        expect(chain2.lastBlock().data).to.equal("Hello There!")
    })

    it('validates a new block', () => {
        let bk1 = chain1.generateBlock('Bravo')
        expect(chain1.isValidBlock(bk1, chain1.chain[0])).to.be.true
    })

    it('... and determines that it has a correct structure', () => {
        let bk1 = chain1.generateBlock('Alpha')
        expect(bk1.isValidBlockStructure()).to.be.true
        expect(chain1.chain[1].isValidBlockStructure()).to.be.true
    })

    afterEach(() => {
        let chain1, chain2
    })

} )