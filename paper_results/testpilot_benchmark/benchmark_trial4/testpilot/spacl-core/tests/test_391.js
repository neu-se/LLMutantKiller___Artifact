let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test PolicyMap.matches with complex patterns', function(done) {
        try {
            let policyMap = new _spacl_core.PolicyMap();
            
            // Add policies with different patterns
            policyMap.add('rootPolicy', '/*', { level: 1 });
            policyMap.add('apiPolicy', '/api/**', { level: 2 });
            policyMap.add('userPolicy', '/api/users/*', { level: 3 });
            
            // Test hierarchical matching
            let result1 = policyMap.matches('rootPolicy', '/anything', {});
            assert.strictEqual(result1, true, 'Should match root wildcard');
            
            let result2 = policyMap.matches('apiPolicy', '/api/v1/users', {});
            assert.strictEqual(result2, true, 'Should match double wildcard');
            
            let result3 = policyMap.matches('userPolicy', '/api/users/123', {});
            assert.strictEqual(result3, true, 'Should match specific pattern');
            
            // Test non-matching cases
            let result4 = policyMap.matches('userPolicy', '/api/posts/123', {});
            assert.strictEqual(result4, false, 'Should not match different endpoint');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});