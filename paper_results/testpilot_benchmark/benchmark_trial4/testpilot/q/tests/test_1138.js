let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfcall - callback with multiple return values', function(done) {
        // Mock function that returns multiple values via callback
        function mockMultiReturnFunction(callback) {
            setTimeout(() => {
                callback(null, 'first', 'second', 'third');
            }, 10);
        }
        
        q.nfcall(mockMultiReturnFunction)
            .then(result => {
                // In Node.js callback convention, only the first non-error value is typically used
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });
});