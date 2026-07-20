let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query', function(done) {
        // Test 1: Query with existing policy that returns a result
        const policyMap1 = new _spacl_core.PolicyMap();
        const mockPolicy1 = {
            query: function(path, verb, ctx) {
                return { allowed: true, path: path, verb: verb };
            }
        };
        policyMap1.set('testPolicy1', mockPolicy1);
        
        const result1 = policyMap1.query('testPolicy1', '/api/users', 'GET', { user: 'admin' });
        assert.strictEqual(result1.allowed, true);
        assert.strictEqual(result1.path, '/api/users');
        assert.strictEqual(result1.verb, 'GET');

        // Test 2: Query with existing policy that returns null
        const policyMap2 = new _spacl_core.PolicyMap();
        const mockPolicy2 = {
            query: function(path, verb, ctx) {
                return null;
            }
        };
        policyMap2.set('testPolicy2', mockPolicy2);
        
        const result2 = policyMap2.query('testPolicy2', '/api/admin', 'DELETE', { user: 'guest' });
        assert.strictEqual(result2, null);

        // Test 3: Query with non-existing policy
        const policyMap3 = new _spacl_core.PolicyMap();
        const result3 = policyMap3.query('nonExistentPolicy', '/api/data', 'POST', { user: 'user' });
        assert.strictEqual(result3, null);

        // Test 4: Query with undefined policy name
        const policyMap4 = new _spacl_core.PolicyMap();
        const result4 = policyMap4.query(undefined, '/api/test', 'PUT', {});
        assert.strictEqual(result4, null);

        // Test 5: Verify policy.query is called with correct parameters
        const policyMap5 = new _spacl_core.PolicyMap();
        let capturedArgs = null;
        const mockPolicy5 = {
            query: function(path, verb, ctx) {
                capturedArgs = { path: path, verb: verb, ctx: ctx };
                return { success: true };
            }
        };
        policyMap5.set('trackingPolicy', mockPolicy5);
        
        const testCtx = { userId: 123, role: 'editor' };
        policyMap5.query('trackingPolicy', '/api/edit', 'PATCH', testCtx);
        
        assert.strictEqual(capturedArgs.path, '/api/edit');
        assert.strictEqual(capturedArgs.verb, 'PATCH');
        assert.deepStrictEqual(capturedArgs.ctx, testCtx);

        done();
    });
});