let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - passes additional arguments', function(done) {
        // Mock function that expects pre-bound arguments
        function mockAsyncFunction(prefix, data, callback) {
            setTimeout(() => {
                callback(null, `${prefix}: ${data}`);
            }, 10);
        }

        // Test passing additional arguments to denodeify
        let denodeified = q.denodeify(mockAsyncFunction);
        
        denodeified('PREFIX', 'test data')
            .then(result => {
                assert.strictEqual(result, 'PREFIX: test data');
                done();
            })
            .catch(done);
    });
});