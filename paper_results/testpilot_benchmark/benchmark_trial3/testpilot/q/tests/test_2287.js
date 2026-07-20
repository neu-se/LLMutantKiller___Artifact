let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind with simple callback', function(done) {
        // Create a mock function that follows Node.js callback convention
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }
        
        // Bind the function using q.nbind
        const boundFunction = q.nbind(mockAsyncFunction, null);
        
        // Test the bound function
        boundFunction('hello', ' world')
            .then(result => {
                assert.equal(result, 'hello world');
                done();
            })
            .catch(done);
    });
});