let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query', function(done) {
        // Create mock Rule instances for testing
        const userRule = new _spacl_core.Rule();
        const adminRule = new _spacl_core.Rule();
        
        // Mock the matches method and verbs property for userRule
        userRule.matches = function(path, ctx) {
            if (path === '/user/foo' && ctx.name === 'foo') return true;
            if (path === '/user/bar') return true;
            return false;
        };
        userRule.verbs = {
            'get': true,
            'put': true
        };
        
        // Mock the matches method and verbs property for adminRule
        adminRule.matches = function(path, ctx) {
            return path.startsWith('/user/');
        };
        adminRule.verbs = {
            'get': true,
            'put': true,
            'delete': function(path, ctx) {
                return path !== '/user/foo';
            }
        };
        
        const ctx = { name: 'foo' };
        
        // Test userRule queries
        assert.strictEqual(userRule.query('/user/foo', 'get', ctx), true);
        assert.strictEqual(userRule.query('/user/foo', 'put', ctx), true);
        assert.strictEqual(userRule.query('/user/foo', 'delete', ctx), null);
        assert.strictEqual(userRule.query('/user/bar', 'get', ctx), true);
        assert.strictEqual(userRule.query('/user/bar', 'put', ctx), true);
        assert.strictEqual(userRule.query('/user/bar', 'delete', ctx), null);
        
        // Test adminRule queries
        assert.strictEqual(adminRule.query('/user/foo', 'get', ctx), true);
        assert.strictEqual(adminRule.query('/user/foo', 'put', ctx), true);
        
        // For delete on /user/foo, the verb function should return false
        const deleteResult = adminRule.query('/user/foo', 'delete', ctx);
        if (typeof deleteResult === 'function') {
            assert.strictEqual(deleteResult('/user/foo', ctx), false);
        } else {
            assert.strictEqual(deleteResult, false);
        }
        
        assert.strictEqual(adminRule.query('/user/bar', 'get', ctx), true);
        assert.strictEqual(adminRule.query('/user/bar', 'put', ctx), true);
        
        // For delete on /user/bar, the verb function should return true
        const deleteBarResult = adminRule.query('/user/bar', 'delete', ctx);
        if (typeof deleteBarResult === 'function') {
            assert.strictEqual(deleteBarResult('/user/bar', ctx), true);
        } else {
            assert.strictEqual(deleteBarResult, true);
        }
        
        // Test non-matching path
        assert.strictEqual(userRule.query('/admin/foo', 'get', ctx), null);
        assert.strictEqual(adminRule.query('/admin/foo', 'get', ctx), null);
        
        // Test non-existing verb
        assert.strictEqual(userRule.query('/user/foo', 'patch', ctx), null);
        assert.strictEqual(adminRule.query('/user/foo', 'patch', ctx), null);
        
        done();
    });
});