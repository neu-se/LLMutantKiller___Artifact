let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with multiple arguments', function(done) {
        // Create a mock node-style function with multiple parameters
        function nodeStyleFunction(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a + b + c);
            }, 10);
        }
        
        // Use q.denodeify to convert the node-style function to a promise-returning function
        const denodeified = q.denodeify(nodeStyleFunction);
        
        denodeified(1, 2, 3)
            .then(result => {
                assert.strictEqual(result, 6);
                done();
            })
            .catch(done);
    });
});