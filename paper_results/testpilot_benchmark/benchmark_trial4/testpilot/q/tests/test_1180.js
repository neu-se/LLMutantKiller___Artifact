let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with multiple arguments', function(done) {
        // Create a mock node-style function that returns multiple values
        function nodeStyleFunction(a, b, callback) {
            setTimeout(() => {
                callback(null, a + b, a * b);
            }, 10);
        }
        
        // Use q.denodeify directly on the node-style function
        const denodeified = q.denodeify(nodeStyleFunction);
        
        denodeified(3, 4)
            .then(result => {
                // When multiple values are returned, Q typically returns just the first value
                assert.strictEqual(result, 7); // First return value (3 + 4)
                done();
            })
            .catch(done);
    });
});