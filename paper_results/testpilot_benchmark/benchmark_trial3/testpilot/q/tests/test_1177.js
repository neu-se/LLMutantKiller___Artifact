let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with successful callback', function(done) {
        // Create a mock node-style function that succeeds
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                callback(null, value * 2);
            }, 10);
        }
        
        // Use q.denodeify to convert the node-style function to a promise-returning function
        const denodeified = q.denodeify(nodeStyleFunction);
        
        denodeified(5)
            .then(result => {
                assert.strictEqual(result, 10);
                done();
            })
            .catch(done);
    });
});