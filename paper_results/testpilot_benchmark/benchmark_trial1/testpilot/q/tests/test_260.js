let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - multiple return values', function(done) {
        function mockMultipleReturns(callback) {
            setTimeout(() => {
                callback(null, 'first', 'second', 'third');
            }, 10);
        }
        
        q.nfapply(mockMultipleReturns, [])
            .then(result => {
                // Q typically returns only the first non-error argument
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });
});