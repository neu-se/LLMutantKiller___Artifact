let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap', function(done) {
        // Mock policy objects for testing
        const mockPolicy1 = {
            name: 'policy1',
            query: function(path, verb, ctx) {
                if (path === '/allowed' && verb === 'read') return true;
                if (path === '/denied' && verb === 'write') return false;
                return null;
            },
            matches: function(path, ctx) {
                return path.startsWith('/allowed') || path.startsWith('/denied');
            }
        };

        const mockPolicy2 = {
            name: 'policy2',
            query: function(path, verb, ctx) {
                if (path === '/admin' && verb === 'delete') return true;
                return null;
            },
            matches: function(path, ctx) {
                return path.startsWith('/admin');
            }
        };

        // Test constructor with policies
        const policyMap = new _spacl_core.PolicyMap(mockPolicy1, mockPolicy2);
        
        // Test that policies are properly stored
        assert.strictEqual(policyMap.size, 2);
        assert.strictEqual(policyMap.get('policy1'), mockPolicy1);
        assert.strictEqual(policyMap.get('policy2'), mockPolicy2);

        // Test push method
        const mockPolicy3 = {
            name: 'policy3',
            query: function(path, verb, ctx) { return null; },
            matches: function(path, ctx) { return false; }
        };
        
        const result = policyMap.push(mockPolicy3);
        assert.strictEqual(result, policyMap); // Should return this for chaining
        assert.strictEqual(policyMap.size, 3);
        assert.strictEqual(policyMap.get('policy3'), mockPolicy3);

        // Test query method - existing policy with allowed action
        assert.strictEqual(policyMap.query('policy1', '/allowed', 'read'), true);
        
        // Test query method - existing policy with denied action
        assert.strictEqual(policyMap.query('policy1', '/denied', 'write'), false);
        
        // Test query method - existing policy with ungoverned action
        assert.strictEqual(policyMap.query('policy1', '/other', 'read'), null);
        
        // Test query method - non-existing policy
        assert.strictEqual(policyMap.query('nonexistent', '/path', 'verb'), null);

        // Test matches method - existing policy with matching path
        assert.strictEqual(policyMap.matches('policy1', '/allowed/subpath'), true);
        assert.strictEqual(policyMap.matches('policy2', '/admin/users'), true);
        
        // Test matches method - existing policy with non-matching path
        assert.strictEqual(policyMap.matches('policy1', '/other'), false);
        
        // Test matches method - non-existing policy
        assert.strictEqual(policyMap.matches('nonexistent', '/path'), false);

        // Test static for method
        const staticPolicyMap = _spacl_core.PolicyMap.for(mockPolicy1);
        assert.strictEqual(staticPolicyMap.size, 1);
        assert.strictEqual(staticPolicyMap.get('policy1'), mockPolicy1);
        assert(staticPolicyMap instanceof _spacl_core.PolicyMap);

        // Test empty constructor
        const emptyPolicyMap = new _spacl_core.PolicyMap();
        assert.strictEqual(emptyPolicyMap.size, 0);

        // Test push with multiple policies
        emptyPolicyMap.push(mockPolicy1, mockPolicy2);
        assert.strictEqual(emptyPolicyMap.size, 2);

        done();
    });
});