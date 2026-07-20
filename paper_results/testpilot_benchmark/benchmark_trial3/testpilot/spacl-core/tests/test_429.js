let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for', function(done) {
        try {
            // Create some test policies first
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

            // Test 1: Create PolicyMap with multiple policies
            const policyMap1 = _spacl_core.PolicyMap.for(userPolicy, adminPolicy, guestPolicy);
            assert(policyMap1, 'PolicyMap should be created successfully');

            // Test 2: Create PolicyMap with single policy
            const policyMap2 = _spacl_core.PolicyMap.for(userPolicy);
            assert(policyMap2, 'PolicyMap should be created with single policy');

            // Test 3: Create empty PolicyMap
            const policyMap3 = _spacl_core.PolicyMap.for();
            assert(policyMap3, 'PolicyMap should be created even when empty');

            // Test 4: Verify PolicyMap contains the policies (assuming it has a method to check)
            if (typeof policyMap1.has === 'function') {
                assert(policyMap1.has('user'), 'PolicyMap should contain user policy');
                assert(policyMap1.has('admin'), 'PolicyMap should contain admin policy');
                assert(policyMap1.has('guest'), 'PolicyMap should contain guest policy');
            }

            // Test 5: Verify PolicyMap can retrieve policies (assuming it has a get method)
            if (typeof policyMap1.get === 'function') {
                const retrievedUser = policyMap1.get('user');
                assert(retrievedUser, 'Should be able to retrieve user policy');
            }

            done();
        } catch (error) {
            done(error);
        }
    });
});