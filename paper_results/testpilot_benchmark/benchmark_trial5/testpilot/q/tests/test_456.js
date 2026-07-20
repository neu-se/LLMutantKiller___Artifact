let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with synchronous callback', function(done) {
        // Create a simple synchronous callback
        function syncCallback(a, b) {
            return a + b;
        }
        
        // Wrap it with q.promised
        const promisedCallback = q.promised(syncCallback);
        
        // Call the promised function
        const result = promisedCallback(5, 3);
        
        // Verify it returns a promise
        assert(q.isPromise(result), 'Should return a promise');
        
        // Verify the promise resolves with correct value
        result.then(function(value) {
            assert.strictEqual(value, 8, 'Should return sum of arguments');
            done();
        }).catch(done);
    });

    })