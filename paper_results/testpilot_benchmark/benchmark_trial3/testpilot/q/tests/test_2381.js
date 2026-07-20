let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.noConflict returns the q module', function(done) {
        // Store original q reference
        let originalQ = q;
        
        // Call noConflict and verify it returns the q module
        let returnedQ = q.noConflict();
        
        // Verify that noConflict returns the q module itself
        assert.strictEqual(returnedQ, originalQ);
        assert.strictEqual(typeof returnedQ.defer, 'function');
        assert.strictEqual(typeof returnedQ.Promise, 'function');
        
        done();
    });
});