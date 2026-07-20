let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for with name and multiple rules', function(done) {
        // Test creating a policy with a name and multiple rules
        const policyName = 'multiRulePolicy';
        const rule1 = { action: 'read', resource: 'document' };
        const rule2 = { action: 'write', resource: 'file' };
        const rule3 = { action: 'delete', resource: 'record' };
        const policy = _spacl_core.Policy.for(policyName, rule1, rule2, rule3);
        
        assert(policy instanceof _spacl_core.Policy, 'Should return a Policy instance');
        assert.strictEqual(policy.name, policyName, 'Policy name should match');
        assert(Array.isArray(policy.rules) || policy.rules, 'Policy should have rules');
        done();
    });
});