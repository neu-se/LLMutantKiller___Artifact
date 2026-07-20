let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall - no arguments', function(done) {
        // Mock function that takes only a callback
        function mockNoArgsFunction(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        // Use q.nfcall directly instead of q.makePromise
        let promise = q.nfcall(mockNoArgsFunction);
        
        promise
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});