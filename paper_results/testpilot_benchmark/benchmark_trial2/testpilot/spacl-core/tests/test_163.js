let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.prototype.query', function(done) {
        // Create a PolicyMap instance
        const policyMap = new _spacl_core.PolicyMap();
        
        // Create mock policies that simulate the behavior from the examples
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
        
        // Add policies to the map using set method (assuming it exists)
        policyMap.set('user', mockUserPolicy);
        policyMap.set('admin', mockAdminPolicy);
        
        // Test context
        const ctx = { name: 'foo' };
        
        // Test user policy queries
        assert.strictEqual(policyMap.query('user', '/user/foo', 'get', ctx), true, 'user should be able to get /user/foo');
        assert.strictEqual(policyMap.query('user', '/user/foo', 'put', ctx), true, 'user should be able to put /user/foo');
        assert.strictEqual(policyMap.query('user', '/user/foo', 'delete', ctx), null, 'user delete /user/foo should be implicitly denied');
        assert.strictEqual(policyMap.query('user', '/user/bar', 'get', ctx), true, 'user should be able to get /user/bar');
        assert.strictEqual(policyMap.query('user', '/user/bar', 'put', ctx), null, 'user put /user/bar should be implicitly denied');
        assert.strictEqual(policyMap.query('user', '/user/bar', 'delete', ctx), null, 'user delete /user/bar should be implicitly denied');
        
        // Test admin policy queries
        assert.strictEqual(policyMap.query('admin', '/user/foo', 'get', ctx), true, 'admin should be able to get /user/foo');
        assert.strictEqual(policyMap.query('admin', '/user/foo', 'put', ctx), true, 'admin should be able to put /user/foo');
        assert.strictEqual(policyMap.query('admin', '/user/foo', 'delete', ctx), false, 'admin delete /user/foo should be explicitly denied');
        assert.strictEqual(policyMap.query('admin', '/user/bar', 'get', ctx), true, 'admin should be able to get /user/bar');
        assert.strictEqual(policyMap.query('admin', '/user/bar', 'put', ctx), true, 'admin should be able to put /user/bar');
        assert.strictEqual(policyMap.query('admin', '/user/bar', 'delete', ctx), true, 'admin should be able to delete /user/bar');
        
        // Test querying non-existent policy
        assert.strictEqual(policyMap.query('nonexistent', '/user/foo', 'get', ctx), null, 'querying non-existent policy should return null');
        
        done();
    });
    
    })