import {Block} from "../src/block"

import { expect, should } from 'chai'
import 'mocha'


describe ('Single Block creation and validation', () => {

    let block1, block2, ts, aHash, bHash

    beforeEach (() => {
        ts = new Date().getTime()
        aHash = Block.computeHash(0, null, ts, "Hello World!!!")
        block1 = new Block(0, aHash, null, ts, "Hello World!!!")
        bHash = Block.computeHash(1, null, ts, "Hello Again!!")
        block2 = new Block(1, bHash, aHash, ts, "Hello Again!!")
    })

    it('generic block created, ...', () => {
        expect(block1.index).to.equal(0)
        expect(block1.prevHash).to.be.null
        expect(block1.hash).to.be.a('string')
        expect(block1.hash).to.equal(aHash)
        expect(block1.timestamp).to.equal(ts)
        expect(block1.data).to.equal('Hello World!!!')
        // console.log(block1.to_string())
    })

    it('a second block created...', () => {
        expect(block2.index).to.equal(1)
        expect(block2.prevHash).to.equal(block1.hash)
        expect(block2.hash).to.be.a('string')
        expect(block2.hash).to.equal(bHash)
        expect(block2.timestamp).to.equal(ts)
        expect(block2.data).to.equal('Hello Again!!')
        // console.log(block2.to_string())
    })
})