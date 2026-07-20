let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with synchronous callback', function(done) {
        // Create a mock function that calls callback synchronously
        function mockSyncFunction(value, callback) {
            callback(null, value * 2);
        }

        q.nfcall(mockSyncFunction, 21)
            .then(result => {
                assert.strictEqual(result, 42);
                done();
            })
            .catch(done);
    });
});