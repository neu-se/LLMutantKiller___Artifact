let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.matches - edge cases', function(done) {
        try {
            let rule = new _spacl_core.Rule('/test', 'GET', 'allow');
            let ctx = { method: 'GET' };
            
            // Test with empty path
            let result1 = rule.matches('', ctx);
            assert.strictEqual(result1, false, 'Should not match empty path');
            
            // Test with null/undefined path
            let result2 = rule.matches(null, ctx);
            assert.strictEqual(result2, false, 'Should not match null path');
            
            // Test with undefined context
            let result3 = rule.matches('/test', undefined);
            assert.strictEqual(typeof result3, 'boolean', 'Should handle undefined context');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});