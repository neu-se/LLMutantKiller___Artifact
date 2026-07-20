let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query', function(done) {
        // Test 1: Query existing policy that returns a result
        const policyMap = new _spacl_core.PolicyMap();
        
        // Create a mock policy object
        const mockPolicy = {
            query: function(path, verb, ctx) {
                if (path === '/test' && verb === 'GET') {
                    return { allowed: true, reason: 'test policy' };
                }
                return { allowed: false, reason: 'denied' };
            }
        };
        
        // Add the mock policy to the map
        policyMap.set('testPolicy', mockPolicy);
        
        // Test querying existing policy with matching conditions
        const result1 = policyMap.query('testPolicy', '/test', 'GET', {});
        assert.strictEqual(result1.allowed, true);
        assert.strictEqual(result1.reason, 'test policy');
        
        // Test querying existing policy with non-matching conditions
        const result2 = policyMap.query('testPolicy', '/other', 'POST', {});
        assert.strictEqual(result2.allowed, false);
        assert.strictEqual(result2.reason, 'denied');
        
        // Test 2: Query non-existing policy
        const result3 = policyMap.query('nonExistentPolicy', '/test', 'GET', {});
        assert.strictEqual(result3, null);
        
        // Test 3: Query with undefined policy name
        const result4 = policyMap.query(undefined, '/test', 'GET', {});
        assert.strictEqual(result4, null);
        
        // Test 4: Query with null policy name
        const result5 = policyMap.query(null, '/test', 'GET', {});
        assert.strictEqual(result5, null);
        
        // Test 5: Query with context parameter
        const mockPolicyWithContext = {
            query: function(path, verb, ctx) {
                if (ctx && ctx.user === 'admin') {
                    return { allowed: true, reason: 'admin access' };
                }
                return { allowed: false, reason: 'insufficient privileges' };
            }
        };
        
        policyMap.set('contextPolicy', mockPolicyWithContext);
        
        const result6 = policyMap.query('contextPolicy', '/admin', 'GET', { user: 'admin' });
        assert.strictEqual(result6.allowed, true);
        assert.strictEqual(result6.reason, 'admin access');
        
        const result7 = policyMap.query('contextPolicy', '/admin', 'GET', { user: 'guest' });
        assert.strictEqual(result7.allowed, false);
        assert.strictEqual(result7.reason, 'insufficient privileges');
        
        done();
    });
});