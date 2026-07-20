let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with multiple arguments', function(done) {
        // Create a mock function that returns multiple values
        function nodeStyleMultipleArgs(a, b, callback) {
            setTimeout(() => {
                callback(null, a + b, a * b);
            }, 10);
        }
        
        // Denodeify the function
        const promisified = q.denodeify(nodeStyleMultipleArgs);
        
        // Test with multiple arguments
        promisified(3, 4)
            .then(result => {
                // q.denodeify returns only the first result value
                assert.strictEqual(result, 7);
                done();
            })
            .catch(done);
    });
    
    })