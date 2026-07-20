let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test isRejected with chained promises', function(done) {
        let chainedRejected = q.resolve('initial')
            .then(() => {
                throw new Error('Chain error');
            });
        
        setTimeout(() => {
            assert.strictEqual(chainedRejected.isRejected(), true, 'Chained promise that throws should return true for isRejected()');
            done();
        }, 0);
    });
});