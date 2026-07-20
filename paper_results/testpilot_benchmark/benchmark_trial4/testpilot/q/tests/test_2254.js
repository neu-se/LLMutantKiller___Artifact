let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall with successful callback', function(done) {
        // Mock function that follows Node.js callback convention (error, result)
        function mockAsyncFunction(value, callback) {
            setTimeout(() => {
                callback(null, value * 2);
            }, 10);
        }
        
        q.nfcall(mockAsyncFunction, 5)
            .then(result => {
                assert.strictEqual(result, 10);
                done();
            })
            .catch(done);
    });
});