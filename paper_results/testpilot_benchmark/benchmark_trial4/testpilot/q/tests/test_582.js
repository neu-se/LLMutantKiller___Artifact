let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test isRejected with promise chain', function(done) {
        let initialPromise = q.resolve('initial value');
        
        let rejectedChain = initialPromise.then(() => {
            throw new Error('Chain error');
        });
        
        setTimeout(() => {
            assert.strictEqual(rejectedChain.isRejected(), true, 'Promise chain that throws should return true for isRejected()');
            done();
        }, 0);
    });
});