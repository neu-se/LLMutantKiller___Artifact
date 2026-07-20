let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.matches - basic path matching', function(done) {
        try {
            // Create a simple policy instance
            let policy = new _spacl_core.Policy();
            
            // Test exact path match
            let result1 = policy.matches('/api/users', {});
            assert.strictEqual(typeof result1, 'boolean');
            
            // Test different path
            let result2 = policy.matches('/api/posts', {});
            assert.strictEqual(typeof result2, 'boolean');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});