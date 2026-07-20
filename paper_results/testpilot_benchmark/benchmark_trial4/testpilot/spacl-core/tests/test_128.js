let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.matches - wildcard pattern', function(done) {
        try {
            // Create a rule with wildcard pattern
            let rule = new _spacl_core.Rule('/api/*', 'GET', 'allow');
            let ctx = { method: 'GET' };
            
            // Test wildcard match
            let result = rule.matches('/api/users', ctx);
            assert.strictEqual(result, true, 'Should match wildcard pattern');
            
            let result2 = rule.matches('/api/posts/123', ctx);
            assert.strictEqual(result2, true, 'Should match nested path with wildcard');
            
            // Test non-matching path
            let result3 = rule.matches('/admin/users', ctx);
            assert.strictEqual(result3, false, 'Should not match path outside wildcard scope');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })