let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query', function(done) {
        // Test 1: Rule matches path and verb exists - should return verb value
        let rule1 = new _spacl_core.Rule();
        rule1.matches = function(path, ctx) { return true; };
        rule1.verbs = { 'GET': 'allow', 'POST': 'deny' };
        
        let result1 = rule1.query('/api/users', 'GET', {});
        assert.strictEqual(result1, 'allow', 'Should return verb value when rule matches and verb exists');
        
        // Test 2: Rule matches path but verb doesn't exist - should return null
        let result2 = rule1.query('/api/users', 'DELETE', {});
        assert.strictEqual(result2, null, 'Should return null when rule matches but verb does not exist');
        
        // Test 3: Rule doesn't match path - should return null regardless of verb
        let rule2 = new _spacl_core.Rule();
        rule2.matches = function(path, ctx) { return false; };
        rule2.verbs = { 'GET': 'allow', 'POST': 'deny' };
        
        let result3 = rule2.query('/api/users', 'GET', {});
        assert.strictEqual(result3, null, 'Should return null when rule does not match path');
        
        // Test 4: Rule matches with different context and verb
        let rule3 = new _spacl_core.Rule();
        rule3.matches = function(path, ctx) { return ctx && ctx.user === 'admin'; };
        rule3.verbs = { 'PUT': 'conditional', 'PATCH': 'allow' };
        
        let result4 = rule3.query('/admin/settings', 'PUT', { user: 'admin' });
        assert.strictEqual(result4, 'conditional', 'Should return verb value when rule matches with context');
        
        // Test 5: Same rule but with different context that doesn't match
        let result5 = rule3.query('/admin/settings', 'PUT', { user: 'guest' });
        assert.strictEqual(result5, null, 'Should return null when context does not match rule conditions');
        
        // Test 6: Empty verbs object
        let rule4 = new _spacl_core.Rule();
        rule4.matches = function(path, ctx) { return true; };
        rule4.verbs = {};
        
        let result6 = rule4.query('/test', 'GET', {});
        assert.strictEqual(result6, null, 'Should return null when verbs object is empty');
        
        done();
    });
});