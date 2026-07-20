let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.clone - default parameters', function(done) {
        try {
            // Create a policy instance
            let originalPolicy = new _spacl_core.Policy('testPolicy');
            
            // Clone with default parameters
            let clonedPolicy = originalPolicy.clone();
            
            // Verify the clone has the same name
            assert.strictEqual(clonedPolicy.name, 'testPolicy');
            
            // Verify it's a different instance
            assert.notStrictEqual(clonedPolicy, originalPolicy);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});