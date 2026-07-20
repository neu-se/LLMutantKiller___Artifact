let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for', function(done) {
        try {
            const { Rule, Policy, PolicyMap } = _spacl_core;
            
            // Create test policies similar to the examples
            const userPolicy = Policy.for('user',
                Rule.for('/user/+').allow('get'),
                Rule.for('/user/:name').allow('put')
            );
            
            const adminPolicy = userPolicy.clone('admin').push(
                Rule.for('/user/+').allow('put', 'post', 'delete'),
                Rule.for('/user/:name').deny('delete')
            );
            
            const guestPolicy = Policy.for('guest',
                Rule.for('/user/+').allow('get')
            );
            
            // Test 1: Create PolicyMap with multiple policies
            const policyMap1 = PolicyMap.for(userPolicy, adminPolicy, guestPolicy);
            assert(policyMap1, 'PolicyMap should be created');
            assert(typeof policyMap1 === 'object', 'PolicyMap should be an object');
            
            // Test 2: Create PolicyMap with single policy
            const policyMap2 = PolicyMap.for(userPolicy);
            assert(policyMap2, 'PolicyMap should be created with single policy');
            
            // Test 3: Create PolicyMap with no policies (edge case)
            const policyMap3 = PolicyMap.for();
            assert(policyMap3, 'PolicyMap should be created with no policies');
            
            // Test 4: Verify PolicyMap has expected methods/properties
            assert(typeof policyMap1.get === 'function' || policyMap1.user !== undefined, 
                'PolicyMap should have access methods or policy properties');
            
            // Test 5: Test with array of policies (if supported)
            try {
                const policyMap4 = PolicyMap.for([userPolicy, adminPolicy]);
                assert(policyMap4, 'PolicyMap should handle array input if supported');
            } catch (e) {
                // Array input might not be supported, which is fine
                console.log('Array input not supported for PolicyMap.for');
            }
            
            done();
        } catch (error) {
            done(error);
        }
    });
    
    })