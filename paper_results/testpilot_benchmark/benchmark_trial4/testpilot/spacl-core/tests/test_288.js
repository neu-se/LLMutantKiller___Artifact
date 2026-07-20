let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone - custom name', function(done) {
        try {
            // Create a policy instance
            let originalPolicy = new _spacl_core.Policy('originalPolicy');
            
            // Clone with custom name
            let clonedPolicy = originalPolicy.clone('clonedPolicy');
            
            // Verify the clone has the new name
            assert.strictEqual(clonedPolicy.name, 'clonedPolicy');
            
            // Verify original name is unchanged
            assert.strictEqual(originalPolicy.name, 'originalPolicy');
            
            // Verify it's a different instance
            assert.notStrictEqual(clonedPolicy, originalPolicy);
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })