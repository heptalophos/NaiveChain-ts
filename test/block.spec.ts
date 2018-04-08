import {Block} from "../src/block"

import { expect, should } from 'chai'
import 'mocha'


describe ('Single Block creation and validation', () => {

    let block1, block2,  ts

    beforeEach (() => {
        ts = new Date().getTime()
        block1 = new Block(0, null, null, ts, "")
        block2 = null
    })

    it ('creates a generic block, ...', () => {
        
        let newHash = Block.computeHash(0, null, ts, "Hello World!!!")
        let block1 = new Block(0, newHash, null, ts, "Hello World!!!")
        expect(block1.index).to.equal(0)
    })
})