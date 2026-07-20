let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - success case', function(done) {
        // Create a mock function that follows Node.js callback convention
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `result: ${arg1} ${arg2}`);
            }, 10);
        }
        
        // Use q.nfapply to call the function with arguments array
        q.nfapply(mockAsyncFunction, ['hello', 'world'])
            .then(result => {
                assert.strictEqual(result, 'result: hello world');
                done();
            })
            .catch(done);
    });
});