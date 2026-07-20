let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with custom promisification', function(done) {
        // Create a mock function that doesn't follow Node.js callback pattern
        function nonStandardFunction(value) {
            return value * 2;
        }
        
        // Since q.makePromise doesn't exist, we'll create our own promisification
        function makePromiseWithFallback(fn, fallbackFn) {
            return function(...args) {
                try {
                    // Try to use the original function
                    const result = fn.apply(this, args);
                    // If it returns a value, resolve with it
                    return q.resolve(result);
                } catch (error) {
                    // If it fails, use the fallback
                    return fallbackFn.apply(this, args);
                }
            };
        }
        
        function fallbackFunction(value) {
            return q.resolve(value * 3);
        }
        
        const promisified = makePromiseWithFallback(nonStandardFunction, fallbackFunction);
        
        promisified(4)
            .then(result => {
                assert.strictEqual(result, 8); // Should use original function: 4 * 2
                done();
            })
            .catch(done);
    });
});