let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for', function(done) {
        try {
            // Test 1: Create PolicyMap with no policies
            const emptyPolicyMap = _spacl_core.PolicyMap.for();
            assert(emptyPolicyMap instanceof _spacl_core.PolicyMap, 'Should create PolicyMap instance with no policies');

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

            // Test 4: Verify PolicyMap.for is equivalent to new PolicyMap constructor
            const constructorMap = new _spacl_core.PolicyMap(userPolicy, adminPolicy);
            const factoryMap = _spacl_core.PolicyMap.for(userPolicy, adminPolicy);
            assert(factoryMap instanceof _spacl_core.PolicyMap, 'Factory method should create same type as constructor');
            assert(constructorMap instanceof _spacl_core.PolicyMap, 'Constructor should create PolicyMap instance');

            // Test 5: Test with spread operator (multiple policies)
            const policies = [userPolicy, adminPolicy];
            const spreadPolicyMap = _spacl_core.PolicyMap.for(...policies);
            assert(spreadPolicyMap instanceof _spacl_core.PolicyMap, 'Should handle spread operator correctly');

            done();
        } catch (error) {
            done(error);
        }
    });
});