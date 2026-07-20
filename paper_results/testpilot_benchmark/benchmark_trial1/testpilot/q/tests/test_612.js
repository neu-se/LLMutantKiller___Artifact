let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.noConflict removes global Q if none existed before', function(done) {
        // Store original global Q state
        let originalGlobalQ = global.Q;
        let hadGlobalQ = 'Q' in global;
        
        // Clean up any existing global Q first
        delete global.Q;
        
        // Require q again to simulate it being loaded as a global
        // This is necessary because q.noConflict() only works when Q is used as a global
        delete require.cache[require.resolve('q')];
        
        // Set global Q to undefined to simulate no previous Q
        global.Q = undefined;
        
        // Now require q again, which should set up the global
        let qGlobal = require('q');
        
        // Verify Q is now global
        assert.strictEqual(global.Q, qGlobal);
        
        // Call noConflict
        let returnedQ = qGlobal.noConflict();
        
        // Verify that global.Q is undefined after noConflict
        assert.strictEqual(global.Q, undefined);
        
        // Verify that the returned value is still the q module
        assert.strictEqual(typeof returnedQ.defer, 'function');
        assert.strictEqual(typeof returnedQ.Promise, 'function');
        
        // Restore original state
        if (hadGlobalQ) {
            global.Q = originalGlobalQ;
        } else {
            delete global.Q;
        }
        
        done();
    });
});