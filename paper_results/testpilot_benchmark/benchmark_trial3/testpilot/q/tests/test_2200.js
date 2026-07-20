let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with multiple return values', function(done) {
        // Mock function that returns multiple values
        function mockMultipleValues(callback) {
            setTimeout(() => {
                callback(null, 'first', 'second', 'third');
            }, 10);
        }
        
        q.nfapply(mockMultipleValues, [])
            .then(result => {
                // q.nfapply should only return the first non-error value
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });
});