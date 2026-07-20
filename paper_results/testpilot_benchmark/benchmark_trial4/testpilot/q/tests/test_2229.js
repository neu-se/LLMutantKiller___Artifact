let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with no additional arguments', function(done) {
        // Mock function that takes only a callback
        function mockAsyncFunction(callback) {
            setTimeout(() => {
                callback(null, 'no args');
            }, 10);
        }

        q.nfcall(mockAsyncFunction)
            .then(function(result) {
                assert.strictEqual(result, 'no args');
                done();
            })
            .catch(done);
    });

    })