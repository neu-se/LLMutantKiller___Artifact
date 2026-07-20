let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query', function(done) {
        // Create mock rules for testing
        
        // User rule - allows own resource access for get/put, read-only for others
        const userRule = new _spacl_core.Rule();
        userRule.matches = function(path, ctx) {
            return path.startsWith('/user/');
        };
        userRule.verbs = {
            'get': true,
            'put': function(path, ctx) {
                // Users can only put to their own resource
                return path === `/user/${ctx.name}`;
            }
        };
        
        // Admin rule - full access except delete on own resource
        const adminRule = new _spacl_core.Rule();
        adminRule.matches = function(path, ctx) {
            return path.startsWith('/user/');
        };
        adminRule.verbs = {
            'get': true,
            'put': true,
            'delete': function(path, ctx) {
                // Admin cannot delete their own resource
                return path !== `/user/${ctx.name}`;
            }
        };
        
        // Test context
        const ctx = { name: 'foo' };
        
        // Test user rule queries
        assert.strictEqual(userRule.query('/user/foo', 'get', ctx), true, 'User should be able to get own resource');
        assert.strictEqual(userRule.query('/user/foo', 'put', ctx), true, 'User should be able to put own resource');
        assert.strictEqual(userRule.query('/user/foo', 'delete', ctx), null, 'User delete should return null (verb not defined)');
        
        assert.strictEqual(userRule.query('/user/bar', 'get', ctx), true, 'User should be able to get other resources');
        assert.strictEqual(userRule.query('/user/bar', 'put', ctx), false, 'User should not be able to put other resources');
        assert.strictEqual(userRule.query('/user/bar', 'delete', ctx), null, 'User delete should return null (verb not defined)');
        
        // Test admin rule queries
        assert.strictEqual(adminRule.query('/user/foo', 'get', ctx), true, 'Admin should be able to get own resource');
        assert.strictEqual(adminRule.query('/user/foo', 'put', ctx), true, 'Admin should be able to put own resource');
        assert.strictEqual(adminRule.query('/user/foo', 'delete', ctx), false, 'Admin should not be able to delete own resource');
        
        assert.strictEqual(adminRule.query('/user/bar', 'get', ctx), true, 'Admin should be able to get other resources');
        assert.strictEqual(adminRule.query('/user/bar', 'put', ctx), true, 'Admin should be able to put other resources');
        assert.strictEqual(adminRule.query('/user/bar', 'delete', ctx), true, 'Admin should be able to delete other resources');
        
        // Test non-matching paths
        assert.strictEqual(userRule.query('/admin/foo', 'get', ctx), null, 'Non-matching path should return null');
        assert.strictEqual(adminRule.query('/admin/foo', 'get', ctx), null, 'Non-matching path should return null');
        
        // Test non-existent verbs
        assert.strictEqual(userRule.query('/user/foo', 'patch', ctx), null, 'Non-existent verb should return null');
        assert.strictEqual(adminRule.query('/user/foo', 'patch', ctx), null, 'Non-existent verb should return null');
        
        done();
    });
});