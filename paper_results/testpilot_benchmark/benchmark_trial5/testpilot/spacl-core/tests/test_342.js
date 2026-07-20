let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for with empty string name', function(done) {
        // Test creating a policy with an empty string name
        const policyName = '';
        const policy = _spacl_core.Policy.for(policyName);
        
        assert(policy instanceof _spacl_core.Policy, 'Should return a Policy instance');
        assert.strictEqual(policy.name, policyName, 'Policy name should be empty string');
        done();
    });
});