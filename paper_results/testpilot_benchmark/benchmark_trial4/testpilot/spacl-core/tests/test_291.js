let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone - preserves policy type', function(done) {
        try {
            // Create a policy instance
            let originalPolicy = new _spacl_core.Policy('testPolicy');
            
            // Clone the policy
            let clonedPolicy = originalPolicy.clone();
            
            // Verify both are Policy instances
            assert(originalPolicy instanceof _spacl_core.Policy);
            assert(clonedPolicy instanceof _spacl_core.Policy);
            
            // Verify they have the same constructor
            assert.strictEqual(clonedPolicy.constructor, originalPolicy.constructor);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});