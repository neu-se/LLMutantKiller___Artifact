let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with successful callback', function(done) {
        // Mock a Node.js style callback function that succeeds
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `Result: ${arg1} + ${arg2}`);
            }, 10);
        }

        q.nfapply(mockAsyncFunction, ['hello', 'world'])
            .then(result => {
                assert.strictEqual(result, 'Result: hello + world');
                done();
            })
            .catch(done);
    });

    })