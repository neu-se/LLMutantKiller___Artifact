let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test PolicyMap complex patterns', function(done) {
        try {
            let policyMap = new _spacl_core.PolicyMap();
            
            // Test multiple policies with different patterns
            policyMap.add('policy1', '/api/v1/*', { version: 'v1' });
            policyMap.add('policy2', '/api/v2/*', { version: 'v2' });
            policyMap.add('policy3', '/admin/**', { role: 'admin' });
            
            // Test v1 API access
            let result1 = policyMap.matches('policy1', '/api/v1/users', { version: 'v1' });
            assert.strictEqual(result1, true, 'Should match v1 API pattern');
            
            // Test v2 API access
            let result2 = policyMap.matches('policy2', '/api/v2/posts', { version: 'v2' });
            assert.strictEqual(result2, true, 'Should match v2 API pattern');
            
            // Test admin access with deep path
            let result3 = policyMap.matches('policy3', '/admin/users/settings/profile', { role: 'admin' });
            assert.strictEqual(result3, true, 'Should match admin deep path');
            
            // Test cross-policy access (should fail)
            let result4 = policyMap.matches('policy1', '/api/v2/users', { version: 'v1' });
            assert.strictEqual(result4, false, 'Should not match wrong API version');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});