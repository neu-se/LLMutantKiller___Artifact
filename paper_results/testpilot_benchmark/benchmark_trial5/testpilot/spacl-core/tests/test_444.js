let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for', function(done) {
        try {
            // Create some test policies similar to the examples
            const userPolicy = _spacl_core.Policy.for('user',
                _spacl_core.Rule.for('/user/+').allow('get'),
                _spacl_core.Rule.for('/user/:name').allow('put')
            );

            const adminPolicy = userPolicy.clone('admin').push(
                _spacl_core.Rule.for('/user/+').allow('put', 'post', 'delete'),
                _spacl_core.Rule.for('/user/:name').deny('delete')
            );

            const guestPolicy = _spacl_core.Policy.for('guest',
                _spacl_core.Rule.for('/user/+').allow('get')
            );

            // Test creating a PolicyMap with multiple policies
            const policyMap = _spacl_core.PolicyMap.for(userPolicy, adminPolicy, guestPolicy);

            // Verify the PolicyMap was created
            assert(policyMap !== null, 'PolicyMap should not be null');
            assert(policyMap !== undefined, 'PolicyMap should not be undefined');

            // Test creating PolicyMap with single policy
            const singlePolicyMap = _spacl_core.PolicyMap.for(userPolicy);
            assert(singlePolicyMap !== null, 'Single policy PolicyMap should not be null');

            // Test creating empty PolicyMap
            const emptyPolicyMap = _spacl_core.PolicyMap.for();
            assert(emptyPolicyMap !== null, 'Empty PolicyMap should not be null');

            done();
        } catch (error) {
            done(error);
        }
    });
});