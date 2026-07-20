```javascript
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
        
        // Test 5: Query with empty string policy name
        const result6 = policyMap.query('', '/test', 'GET', {});
        assert.strictEqual(result6, null);
        
        done();
    });
    
    it('test query with different parameter types', function(done) {
        const policyMap = new _spacl_core.PolicyMap();
        
        // Create a mock policy that echoes back the parameters
        const echoPolicy = {
            query: function(path, verb, ctx) {
                return { path: path, verb: verb, ctx: ctx };
            }
        };
        
        policyMap.set('echoPolicy', echoPolicy);
        
        // Test with various parameter types
        const result1 = policyMap.query('echoPolicy', '/api/users', 'DELETE', { user: 'admin' });
        assert.strictEqual(result1.path, '/api/users');
        assert.strictEqual(result1.verb, 'DELETE');
        assert.deepStrictEqual(result1.ctx, { user: 'admin' });
        
        // Test with null context
        const result2 = policyMap.query('echoPolicy', '/home', 'GET', null);
        assert.strictEqual(result2.path, '/home');
        assert.strictEqual(result2.verb, 'GET');
        assert.strictEqual(result2.ctx, null);
        
        done();
    });
    
    it('test query with policy that throws exception', function(done) {
        const policyMap = new _spacl_core.PolicyMap();
        
        // Create a policy that throws an exception
        const faultyPolicy = {
            query: function(path, verb, ctx) {
                throw new Error('Policy execution failed');
            }
        };
        
        policyMap.set('faultyPolicy', faultyPolicy);
        
        // Test that exception is propagated
        assert.throws(() => {
            policyMap.query('