let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.push - single policy', function(done) {
        try {
            // Create initial policy
            const userPolicy = _spacl_core.Policy.for('user',
                _spacl_core.Rule.for('/user/+').allow('get'),
                _spacl_core.Rule.for('/user/:name').allow('put')
            );
            
            // Create policy map and add initial policy
            const policyMap = new _spacl_core.PolicyMap();
            policyMap.push(userPolicy);
            
            // Verify the policy was added
            assert.strictEqual(policyMap.size, 1);
            assert.ok(policyMap.has('user'));
            assert.strictEqual(policyMap.get('user'), userPolicy);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});