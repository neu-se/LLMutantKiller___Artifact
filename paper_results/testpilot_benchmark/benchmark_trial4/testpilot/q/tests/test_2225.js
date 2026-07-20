let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with multiple arguments', function(done) {
        // Create a mock function that takes multiple arguments
        function mockAsyncFunction(a, b, c, d, callback) {
            setTimeout(() => {
                callback(null, a + b + c + d);
            }, 10);
        }

        q.nfcall(mockAsyncFunction, 1, 2, 3, 4)
            .then(result => {
                assert.strictEqual(result, 10);
                done();
            })
            .catch(done);
    });

    })