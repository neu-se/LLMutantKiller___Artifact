let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with no additional arguments', function(done) {
        // Create a mock function that takes only a callback
        function mockAsyncFunction(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }

        q.nfcall(mockAsyncFunction)
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });

    })