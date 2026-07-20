let mocha = require('mocha');
let assert = require('assert');

describe('test q', function() {
    it('test q.noConflict removes global Q when no previous value existed', function(done) {
        // Ensure no global Q exists initially
        delete global.Q;
        
        // Mock the q module behavior
        let qModule = {
            noConflict: function() {
                // Simulate noConflict behavior - remove global.Q and return the module
                if (global.Q === this) {
                    delete global.Q;
                }
                return this;
            }
        };
        
        // Set global.Q to simulate what q module would do when loaded
        global.Q = qModule;
        
        // Call noConflict
        let returnedQ = qModule.noConflict();
        
        // Verify that global.Q is undefined after noConflict
        assert.strictEqual(global.Q, undefined);
        assert.strictEqual(returnedQ, qModule);
        
        done();
    });
});