let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with error callback', function(done) {
        // Create a mock node-style function that fails
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                if (value < 0) {
                    callback(new Error('Negative value not allowed'));
                } else {
                    callback(null, value * 2);
                }
            }, 10);
        }
        
        // Use q.denodeify to convert the node-style function to a promise
        const denodeified = q.denodeify(nodeStyleFunction);
        
        // Test the denodeified function with error case
        denodeified(-5)
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Negative value not allowed');
                done();
            });
    });
});