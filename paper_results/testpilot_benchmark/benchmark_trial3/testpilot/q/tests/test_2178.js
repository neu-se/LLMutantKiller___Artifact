let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with successful callback', function(done) {
        // Mock Node.js style callback function that succeeds
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }

        q.nfapply(mockAsyncFunction, ['hello', ' world'])
            .then(function(result) {
                assert.strictEqual(result, 'hello world');
                done();
            })
            .catch(done);
    });

    })