```javascript
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query', function(done) {
        // Create a PolicyMap instance
        const policyMap = new _spacl_core.PolicyMap();
        
        // Create mock policies that simulate the behavior shown in examples
        const mockUserPolicy = {
            query: function(path, verb, ctx) {
                if (path === '/user/foo' && (verb === 'get' || verb === 'put')) return true;
                if (path === '/user/bar' && verb === 'get') return true;
                return null; // implicitly denied
            }
        };
        
        const mockAdminPolicy = {
            query: function(path, verb, ctx) {
                if (path === '/user/foo' && verb === 'delete') return false; // explicitly denied
                if (path === '/user/foo' && (verb === 'get' || verb === 'put')) return true;
                if (path === '/user/bar' && (verb === 'get' || verb === 'put' || verb === 'delete')) return true;
                return null;
            }
        };
        
        // Add policies to the map (assuming set method exists)
        policyMap.set('user', mockUserPolicy);
        policyMap.set('admin', mockAdminPolicy);
        
        // Test context
        const ctx = { name: 'foo' };
        
        // Test user policy queries
        assert.strictEqual(policyMap.query('user', '/user/foo', 'get', ctx), true);
        assert.strictEqual(policyMap.query('user', '/user/foo', 'put', ctx), true);
        assert.strictEqual(policyMap.query('user', '/user/foo', 'delete', ctx), null);
        assert.strictEqual(policyMap.query('user', '/user/bar', 'get', ctx), true);
        assert.strictEqual(policyMap.query('user', '/user/bar', 'put', ctx), null);
        assert.strictEqual(policyMap.query('user', '/user/bar', 'delete', ctx), null);
        
        // Test admin policy queries
        assert.strictEqual(policyMap.query('admin', '/user/foo', 'get', ctx), true);
        assert.strictEqual(policyMap.query('admin', '/user/foo', 'put', ctx), true);
        assert.strictEqual(policyMap.query('admin', '/user/foo', 'delete', ctx), false);
        assert.strictEqual(policyMap.query('admin', '/user/bar', 'get', ctx), true);
        assert.strictEqual(policyMap.query('admin', '/user/bar', 'put', ctx), true);
        assert.strictEqual(policyMap.query('admin', '/user/bar', 'delete', ctx), true);
        
        // Test querying non-existent policy
        assert.strictEqual(policyMap.query('nonexistent', '/user/foo', 'get', ctx), null);
        
        done();
    });
    
    it('test query with undefined policy returns null', function(done) {
        const policyMap = new _spacl_core.PolicyMap();
        const ctx = { name: 'test' };
        
        // Query a policy that doesn't exist
        const result = policyMap.query('missing-policy', '/some/path', 'get', ctx);
        assert.strictEqual(result, null);
        
        done();
    });
    
    it('test query delegates to policy.query method', function(done) {
        const policyMap = new _spacl_core.PolicyMap();
        let queryCallCount = 0;
        let lastQueryArgs = null;
        
        const mockPolicy = {
            query: function(path, verb, ctx) {
                queryCallCount++;
                lastQueryArgs = { path, verb, ctx };
                return 