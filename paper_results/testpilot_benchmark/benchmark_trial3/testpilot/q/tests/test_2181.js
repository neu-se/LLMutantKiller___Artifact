let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with multiple return values', function(done) {
        // Mock function that returns multiple values
        function mockMultiValueFunction(callback) {
            setTimeout(() => {
                callback(null, 'first', 'second', 'third');
            }, 10);
        }

        q.nfapply(mockMultiValueFunction, [])
            .then(function(result) {
                // Q.js only returns the first value after error
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });

    })