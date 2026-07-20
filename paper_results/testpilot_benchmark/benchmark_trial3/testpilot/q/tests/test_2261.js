let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify - basic callback conversion', function(done) {
        // Create a simple Node.js style callback function
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                callback(null, value * 2);
            }, 10);
        }
        
        // Denodeify the function
        const promisified = q.denodeify(nodeStyleFunction);
        
        // Test that it returns a promise and works correctly
        promisified(5)
            .then(result => {
                assert.strictEqual(result, 10);
                done();
            })
            .catch(done);
    });
});