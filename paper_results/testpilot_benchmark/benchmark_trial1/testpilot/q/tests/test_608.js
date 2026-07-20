let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.noConflict removes global Q if none existed before', function(done) {
        // Store original global Q state
        let originalGlobalQ = global.Q;
        let hadGlobalQ = 'Q' in global;
        
        // Set up scenario where q is assigned to global Q
        global.Q = q;
        
        // Simulate that no Q existed before by deleting the previous reference
        delete global.Q;
        global.Q = q;
        
        // Call noConflict
        let returnedQ = q.noConflict();
        
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
    
    })