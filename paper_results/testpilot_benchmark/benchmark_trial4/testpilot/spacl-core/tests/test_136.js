let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.matches - with context conditions', function(done) {
        try {
            // Create a rule that considers context
            let rule = new _spacl_core.Rule('/api/users', 'POST', 'allow');
            
            // Test with matching method in context
            let ctx1 = { method: 'POST' };
            let result1 = rule.matches('/api/users', ctx1);
            assert.strictEqual(result1, true, 'Should match with correct method in context');
            
            // Test with non-matching method in context
            let ctx2 = { method: 'DELETE' };
            let result2 = rule.matches('/api/users', ctx2);
            assert.strictEqual(result2, false, 'Should not match with incorrect method in context');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});