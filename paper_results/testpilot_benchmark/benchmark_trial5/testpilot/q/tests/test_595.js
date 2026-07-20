let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with successful callback', function(done) {
        // Mock callback that follows Node.js convention (error, result)
        function mockCallback(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `Result: ${arg1} + ${arg2}`);
            }, 10);
        }

        q.nfcall(mockCallback, 'hello', 'world')
            .then(result => {
                assert.strictEqual(result, 'Result: hello + world');
                done();
            })
            .catch(done);
    });

    })