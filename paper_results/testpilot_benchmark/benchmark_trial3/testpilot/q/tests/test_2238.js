let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with successful callback', function(done) {
        // Mock function that follows Node.js callback convention (error, result)
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }

        q.nfcall(mockAsyncFunction, 'hello', ' world')
            .then(result => {
                assert.strictEqual(result, 'hello world');
                done();
            })
            .catch(done);
    });

    })