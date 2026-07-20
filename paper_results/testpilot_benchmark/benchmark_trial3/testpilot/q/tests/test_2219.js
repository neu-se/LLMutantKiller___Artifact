let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with multiple arguments', function(done) {
        // Mock function that takes multiple arguments
        function mockAsyncFunction(a, b, c, d, callback) {
            setTimeout(() => {
                callback(null, [a, b, c, d].join('-'));
            }, 10);
        }

        q.nfcall(mockAsyncFunction, 'hello', 'world', 123, true)
            .then(function(result) {
                assert.strictEqual(result, 'hello-world-123-true');
                done();
            })
            .catch(done);
    });
});