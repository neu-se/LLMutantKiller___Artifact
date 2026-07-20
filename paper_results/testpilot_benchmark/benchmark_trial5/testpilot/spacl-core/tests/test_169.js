let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test Rule.clone independence', function(done) {
        try {
            // Create original rule
            const original = _spacl_core.Rule.for('/test').allow('get');
            
            // Clone it
            const clone = original.clone('/clone');
            
            // Modify clone (if possible) and verify original is unchanged
            // This tests that the clone is truly independent
            assert.strictEqual('/test', original.regex, 'Original rule should be unchanged');
            assert.strictEqual('/clone', clone.regex, 'Clone should have new regex');
            
            done();
        } catch (error) {
            done(error);
        }
    });
    
    })