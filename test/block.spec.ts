import {Block} from "../src/block"

import { expect, should } from 'chai'
import 'mocha'


describe ('Single Block creation and validation', () => {

    let block1, block2, ts, newHash

    beforeEach (() => {
        ts = new Date().getTime()
        newHash = Block.computeHash(0, null, ts, "Hello World!!!")
        block1 = new Block(0, newHash, null, ts, "Hello World!!!")
        block2 = new Block(0, null, null, ts, "Hello Again!!")
    })

    it ('creates a generic block, ...', () => {
        console.log(block1.to_string())
        block1.index.should.equal(0)
        block1.prevHash.should.be.null
        block1.hash.should.be.a('string')
        block1.hash.should.equal(newHash)
        block1.timestamp.should.equal(ts)
        block1.data.should.equal('Hello World!!!')
    })
})