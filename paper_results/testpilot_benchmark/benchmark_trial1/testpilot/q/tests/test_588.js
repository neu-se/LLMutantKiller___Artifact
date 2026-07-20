let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with successful callback', function(done) {
        // Create a mock Node.js-style function that calls callback with success
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                callback(null, value * 2);
            }, 10);
        }
        
        // Denodeify the function
        const promisified = q.denodeify(nodeStyleFunction);
        
        // Test that it returns a promise and resolves correctly
        promisified(5)
            .then(result => {
                assert.strictEqual(result, 10);
                done();
            })
            .catch(done);
    });
    
    })