let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.noConflict behavior with module usage', function(done) {
        // Store original q reference
        let originalQ = q;
        
        // When Q is used as a module (not global), noConflict should throw an error
        // or not be available as intended for global usage only
        try {
            let returnedQ = q.noConflict();
            // If it doesn't throw, fail the test as this shouldn't work with modules
            assert.fail('noConflict should not work when Q is used as a module');
        } catch (error) {
            // Verify we get the expected error message
            assert.strictEqual(error.message, 'Q.noConflict only works when Q is used as a global');
            
            // Verify that the original q module still works normally
            assert.strictEqual(typeof originalQ.defer, 'function');
            assert.strictEqual(typeof originalQ.Promise, 'function');
        }
        
        done();
    });
});