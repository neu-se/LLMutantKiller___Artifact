let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for with name and single rule', function(done) {
        const policyName = 'testPolicyWithRule';
        const rule = { action: 'read', resource: 'document' };
        const policy = _spacl_core.Policy.for(policyName, rule);
        
        assert(policy instanceof _spacl_core.Policy, 'Should return a Policy instance');
        assert.strictEqual(policy.name, policyName, 'Policy name should match the provided name');
        assert(policy.rules && policy.rules.length === 1, 'Should have one rule');
        assert.deepStrictEqual(policy.rules[0], rule, 'Rule should match the provided rule');
        done();
    });

    })