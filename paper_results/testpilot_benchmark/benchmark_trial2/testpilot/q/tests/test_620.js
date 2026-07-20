let mocha = require('mocha');
let assert = require('assert');

describe('test q', function() {
    it('test q.noConflict restores global Q if it existed', function(done) {
        // Store the original global Q state
        let originalGlobalQ = global.Q;
        
        // Simulate a global Q that existed before
        global.Q = { custom: 'previous Q library' };
        
        // Now require q which will detect the existing global.Q and set up noConflict properly
        delete require.cache[require.resolve('q')];
        let q = require('q');
        
        // Call noConflict
        let returnedQ = q.noConflict();
        
        // Verify that global.Q is restored to the previous value
        assert.deepStrictEqual(global.Q, { custom: 'previous Q library' });
        
        // Verify that the returned value is still the q module
        assert.strictEqual(typeof returnedQ.defer, 'function');
        
        // Restore original state
        global.Q = originalGlobalQ;
        
        // Clear require cache to reset q module state
        delete require.cache[require.resolve('q')];
        
        done();
    });
});