let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify', function(done) {
        // Create a mock Node.js-style callback function that succeeds
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `result: ${arg1} ${arg2}`);
            }, 10);
        }

        // Create a promise and use denodeify on it
        let promise = q.resolve();
        let denodeified = promise.denodeify(mockAsyncFunction);

        // Test that the denodeified function returns a promise
        let result = denodeified('hello', 'world');
        assert(result && typeof result.then === 'function', 'Should return a promise');

        result.then(function(value) {
            assert.equal(value, 'result: hello world', 'Should resolve with correct value');
            done();
        }).catch(done);
    });

    })