let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query', function(done) {
        // Create mock Rule instances for testing
        let userRule = new _spacl_core.Rule();
        let adminRule = new _spacl_core.Rule();
        
        // Mock the matches method and verbs property for userRule
        userRule.matches = function(path, ctx) {
            if (path === '/user/foo' && ctx.name === 'foo') return true;
            if (path === '/user/bar' && ctx.name === 'foo') return true;
            return false;
        };
        userRule.verbs = {
            'get': true,
            'put': true
            // 'delete' is intentionally missing to test null return
        };
        
        // Mock the matches method and verbs property for adminRule
        adminRule.matches = function(path, ctx) {
            return true; // Admin matches all paths
        };
        adminRule.verbs = {
            'get': true,
            'put': true,
            'delete': false // Explicitly denied for /user/foo, allowed for others
        };
        
        // Test context
        const ctx = { name: 'foo' };
        
        // Test user rule queries
        assert.strictEqual(userRule.query('/user/foo', 'get', ctx), true, 'User should be able to GET /user/foo');
        assert.strictEqual(userRule.query('/user/foo', 'put', ctx), true, 'User should be able to PUT /user/foo');
        assert.strictEqual(userRule.query('/user/foo', 'delete', ctx), null, 'User DELETE /user/foo should return null (implicitly denied)');
        assert.strictEqual(userRule.query('/user/bar', 'get', ctx), true, 'User should be able to GET /user/bar');
        assert.strictEqual(userRule.query('/user/bar', 'put', ctx), true, 'User should be able to PUT /user/bar');
        assert.strictEqual(userRule.query('/user/bar', 'delete', ctx), null, 'User DELETE /user/bar should return null (implicitly denied)');
        
        // Test admin rule queries
        assert.strictEqual(adminRule.query('/user/foo', 'get', ctx), true, 'Admin should be able to GET /user/foo');
        assert.strictEqual(adminRule.query('/user/foo', 'put', ctx), true, 'Admin should be able to PUT /user/foo');
        assert.strictEqual(adminRule.query('/user/foo', 'delete', ctx), false, 'Admin DELETE /user/foo should return false (explicitly denied)');
        assert.strictEqual(adminRule.query('/user/bar', 'get', ctx), true, 'Admin should be able to GET /user/bar');
        assert.strictEqual(adminRule.query('/user/bar', 'put', ctx), true, 'Admin should be able to PUT /user/bar');
        assert.strictEqual(adminRule.query('/user/bar', 'delete', ctx), false, 'Admin DELETE /user/bar should return false');
        
        // Test case where path doesn't match
        let noMatchRule = new _spacl_core.Rule();
        noMatchRule.matches = function(path, ctx) {
            return false; // Never matches
        };
        noMatchRule.verbs = { 'get': true };
        
        assert.strictEqual(noMatchRule.query('/any/path', 'get', ctx), null, 'Should return null when path does not match');
        
        // Test case where verb doesn't exist
        let noVerbRule = new _spacl_core.Rule();
        noVerbRule.matches = function(path, ctx) {
            return true; // Always matches
        };
        noVerbRule.verbs = {}; // No verbs defined
        
        assert.strictEqual(noVerbRule.query('/any/path', 'get', ctx), null, 'Should return null when verb does not exist');
        
        done();
    });
});