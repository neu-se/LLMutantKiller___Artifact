let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.matches - exact path match', function(done) {
        try {
            // Create a rule with an exact path pattern
            let rule = new _spacl_core.Rule('/api/users', 'GET', 'allow');
            let ctx = { method: 'GET' };
            
            // Test exact match
            let result = rule.matches('/api/users', ctx);
            assert.strictEqual(result, true, 'Should match exact path');
            
            // Test non-matching path
            let result2 = rule.matches('/api/posts', ctx);
            assert.strictEqual(result2, false, 'Should not match different path');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});