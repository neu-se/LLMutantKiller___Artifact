let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for with name and single rule', function(done) {
        // Test creating a policy with a name and one rule
        const policyName = 'singleRulePolicy';
        const rule = { action: 'read', resource: 'document' };
        const policy = _spacl_core.Policy.for(policyName, rule);
        
        assert(policy instanceof _spacl_core.Policy, 'Should return a Policy instance');
        assert.strictEqual(policy.name, policyName, 'Policy name should match');
        assert(Array.isArray(policy.rules) || policy.rules, 'Policy should have rules');
        done();
    });
});