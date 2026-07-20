let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone - deep copy', function(done) {
        try {
            // Create a policy instance
            let originalPolicy = new _spacl_core.Policy('testPolicy');
            
            // Clone with explicit deep copy
            let clonedPolicy = originalPolicy.clone('deepClone', true);
            
            // Verify the clone has the correct name
            assert.strictEqual(clonedPolicy.name, 'deepClone');
            
            // Verify it's a different instance
            assert.notStrictEqual(clonedPolicy, originalPolicy);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});