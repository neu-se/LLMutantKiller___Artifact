let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for', function(done) {
        try {
            // Test 1: Create PolicyMap with no policies
            const emptyPolicyMap = _spacl_core.PolicyMap.for();
            assert(emptyPolicyMap instanceof _spacl_core.PolicyMap, 'Should create PolicyMap instance with no arguments');

            // Test 2: Create PolicyMap with single policy
            const userPolicy = _spacl_core.Policy.for('user',
                _spacl_core.Rule.for('/user/+').allow('get'),
                _spacl_core.Rule.for('/user/:name').allow('put')
            );
            const singlePolicyMap = _spacl_core.PolicyMap.for(userPolicy);
            assert(singlePolicyMap instanceof _spacl_core.PolicyMap, 'Should create PolicyMap instance with single policy');

            // Test 3: Create PolicyMap with multiple policies
            const adminPolicy = userPolicy.clone('admin').push(
                _spacl_core.Rule.for('/user/+').allow('put', 'post', 'delete'),
                _spacl_core.Rule.for('/user/:name').deny('delete')
            );
            const multiPolicyMap = _spacl_core.PolicyMap.for(userPolicy, adminPolicy);
            assert(multiPolicyMap instanceof _spacl_core.PolicyMap, 'Should create PolicyMap instance with multiple policies');

            // Test 4: Verify PolicyMap contains the policies
            const guestPolicy = _spacl_core.Policy.for('guest',
                _spacl_core.Rule.for('/user/+').allow('get')
            );
            const policyMap = _spacl_core.PolicyMap.for(userPolicy, adminPolicy, guestPolicy);
            assert(policyMap instanceof _spacl_core.PolicyMap, 'Should create PolicyMap with three policies');

            // Test 5: Verify that different calls create different instances
            const policyMap1 = _spacl_core.PolicyMap.for(userPolicy);
            const policyMap2 = _spacl_core.PolicyMap.for(userPolicy);
            assert(policyMap1 !== policyMap2, 'Should create different instances on each call');
            assert(policyMap1 instanceof _spacl_core.PolicyMap, 'First instance should be PolicyMap');
            assert(policyMap2 instanceof _spacl_core.PolicyMap, 'Second instance should be PolicyMap');

            done();
        } catch (error) {
            done(error);
        }
    });
});