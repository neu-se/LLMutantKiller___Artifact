let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with fallback function', function(done) {
        // Create a mock function that doesn't follow Node.js callback pattern
        function nonStandardFunction(value) {
            return value * 2;
        }
        
        function fallbackFunction(value) {
            return q.resolve(value * 3);
        }
        
        const promisified = q.makePromise(nonStandardFunction, fallbackFunction);
        
        promisified(4)
            .then(result => {
                assert.strictEqual(result, 12); // Should use fallback: 4 * 3
                done();
            })
            .catch(done);
    });
    
    })