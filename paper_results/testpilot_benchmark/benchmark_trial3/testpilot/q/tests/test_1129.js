let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with successful callback', function(done) {
        // Create a mock function that follows Node.js callback convention
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }
        
        // Use q.nfapply to call the function with arguments array
        q.nfapply(mockAsyncFunction, [5, 3])
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});