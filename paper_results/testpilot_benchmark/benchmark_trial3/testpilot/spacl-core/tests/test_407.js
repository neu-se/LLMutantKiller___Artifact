let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test PolicyMap complex patterns', function(done) {
        try {
            let policyMap = new _spacl_core.PolicyMap();
            
            // Test multiple policies with different patterns
            policyMap.add('policy1', '/users/*', { action: 'read' });
            policyMap.add('policy2', '/users/*/profile', { action: 'write' });
            policyMap.add('policy3', '/admin/**', { role: 'admin' });
            
            // Test nested path matching
            let result1 = policyMap.matches('policy1', '/users/123', {});
            assert.strictEqual(result1, true, 'Should match single level wildcard');
            
            let result2 = policyMap.matches('policy2', '/users/123/profile', {});
            assert.strictEqual(result2, true, 'Should match specific nested path');
            
            let result3 = policyMap.matches('policy3', '/admin/users/delete', { role: 'admin' });
            assert.strictEqual(result3, true, 'Should match multi-level wildcard');
            
            // Test non-matching cases
            let result4 = policyMap.matches('policy2', '/users/123/settings', {});
            assert.strictEqual(result4, false, 'Should not match different endpoint');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});