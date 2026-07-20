let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with successful callback', function(done) {
        // Create a mock object with a method that follows Node.js callback convention
        const mockObject = {
            testMethod: function(arg1, arg2, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, arg1 + arg2);
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'testMethod', 5, 3)
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});