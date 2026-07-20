let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with synchronous callback', function(done) {
        // Mock function that calls callback synchronously
        function mockSyncFunction(value, callback) {
            callback(null, value.toUpperCase());
        }
        
        q.nfcall(mockSyncFunction, 'hello')
            .then(result => {
                assert.strictEqual(result, 'HELLO');
                done();
            })
            .catch(done);
    });
});