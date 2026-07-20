let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.push - empty call', function(done) {
        // Create a new Policy instance
        let policy = new _spacl_core.Policy();
        
        // Get initial rules length
        let initialLength = policy.rules.length;
        
        // Test pushing no rules
        let result = policy.push();
        
        // Verify no rules were added
        assert.strictEqual(policy.rules.length, initialLength);
        
        // Verify the method still returns the policy instance
        assert.strictEqual(result, policy);
        
        done();
    });
});