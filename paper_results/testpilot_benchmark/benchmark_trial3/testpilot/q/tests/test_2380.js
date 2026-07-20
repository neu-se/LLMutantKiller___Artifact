let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.noConflict restores global Q if it existed', function(done) {
        // Simulate a global Q that existed before
        let originalGlobalQ = global.Q;
        global.Q = { custom: 'previous Q library' };
        
        // Assign q to global Q to simulate conflict
        global.Q = q;
        
        // Call noConflict
        let returnedQ = q.noConflict();
        
        // Verify that global.Q is restored to the previous value
        assert.deepStrictEqual(global.Q, { custom: 'previous Q library' });
        
        // Verify that the returned value is still the q module
        assert.strictEqual(typeof returnedQ.defer, 'function');
        
        // Restore original state
        global.Q = originalGlobalQ;
        
        done();
    });
});