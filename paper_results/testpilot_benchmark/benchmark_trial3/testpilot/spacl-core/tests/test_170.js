let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with null spec', function(done) {
        // Create a rule instance
        const originalRegex = /null-test/i;
        const rule = new _spacl_core.Rule(originalRegex);
        
        // Clone with null spec (should fall back to this.regex)
        const clonedRule = rule.clone(null);
        
        // Verify the cloned rule uses the original regex
        assert.strictEqual(clonedRule.regex.source, originalRegex.source, 'Should use original regex when spec is null');
        assert.strictEqual(clonedRule.regex.flags, originalRegex.flags, 'Should preserve original flags when spec is null');
        
        done();
    });
});