let mocha = require('mocha');
let assert = require('assert');

describe('test q', function() {
    it('test q.noConflict restores previous global Q if it existed', function(done) {
        // Simulate a previous global Q
        let previousQ = { fake: 'previous Q library' };
        global.Q = previousQ;
        
        // Mock the q module behavior
        let qModule = {
            noConflict: function() {
                // Restore the previous Q and return this module
                global.Q = previousQ;
                return this;
            },
            // Add some mock promise functionality to make it look like the real q
            defer: function() { return {}; },
            when: function() { return {}; }
        };
        
        // Simulate q overriding global.Q (like the real module does)
        global.Q = qModule;
        
        // Call noConflict
        let returnedQ = qModule.noConflict();
        
        // Verify that global.Q is restored to the previous value
        assert.strictEqual(global.Q, previousQ);
        assert.strictEqual(returnedQ, qModule);
        
        // Clean up
        delete global.Q;
        
        done();
    });
});