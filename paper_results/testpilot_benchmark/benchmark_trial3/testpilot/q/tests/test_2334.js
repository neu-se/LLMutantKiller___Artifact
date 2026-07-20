let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with successful callback', function(done) {
        // Create a mock object with a method that follows Node.js callback convention
        const mockObject = {
            getData: function(key, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, `value for ${key}`);
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'getData', 'test-key')
            .then(result => {
                assert.strictEqual(result, 'value for test-key');
                done();
            })
            .catch(done);
    });
});