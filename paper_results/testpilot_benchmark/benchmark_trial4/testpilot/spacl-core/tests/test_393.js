let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.matches', function(done) {
        // Create a mock policy object
        const mockPolicy = {
            matches: function(path, ctx) {
                // Simple mock implementation - returns true if path starts with '/allowed'
                return path.startsWith('/allowed');
            }
        };
        
        // Create a PolicyMap instance
        const policyMap = new _spacl_core.PolicyMap();
        
        // Test case 1: Policy exists and matches
        policyMap.set('testPolicy', mockPolicy);
        const result1 = policyMap.matches('testPolicy', '/allowed/resource', {});
        assert.strictEqual(result1, true, 'Should return true when policy exists and matches');
        
        // Test case 2: Policy exists but doesn't match
        const result2 = policyMap.matches('testPolicy', '/denied/resource', {});
        assert.strictEqual(result2, false, 'Should return false when policy exists but doesn\'t match');
        
        // Test case 3: Policy doesn't exist
        const result3 = policyMap.matches('nonExistentPolicy', '/any/path', {});
        assert.strictEqual(result3, false, 'Should return false when policy doesn\'t exist');
        
        // Test case 4: Policy exists and matches with context
        const contextSensitivePolicy = {
            matches: function(path, ctx) {
                return path === '/admin' && ctx.role === 'admin';
            }
        };
        policyMap.set('adminPolicy', contextSensitivePolicy);
        
        const result4 = policyMap.matches('adminPolicy', '/admin', { role: 'admin' });
        assert.strictEqual(result4, true, 'Should return true when policy matches with context');
        
        const result5 = policyMap.matches('adminPolicy', '/admin', { role: 'user' });
        assert.strictEqual(result5, false, 'Should return false when policy doesn\'t match context');
        
        done();
    });
});