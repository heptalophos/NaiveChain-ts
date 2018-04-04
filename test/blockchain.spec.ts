import * as Blockchain from "../src/blockchain";

import { expect } from 'chai'
import 'mocha'

describe ('Blockchain', () => {

    it('should create a new blockchain containing the genesis block', () => {
        let bc1 = Blockchain.blockchain
        expect(bc1[bc1.length - 1].index).to.equal(0)
        expect(bc1[0].hash).to.equal('0123456789abcdef0123456789abcdef0123456789abcdeffedcba9876543210')
        expect(bc1[0].prevHash).to.be.null
        expect(bc1[0].data).to.equal("Hello World")
        expect(bc1[0].timestamp).to.be.a('number')
    })
} )