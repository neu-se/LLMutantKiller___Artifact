let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for with name only', function(done) {
        const policyName = 'testPolicy';
        const policy = _spacl_core.Policy.for(policyName);
        
        assert(policy instanceof _spacl_core.Policy, 'Should return a Policy instance');
        assert.strictEqual(policy.name, policyName, 'Policy name should match the provided name');
        done();
    });
});