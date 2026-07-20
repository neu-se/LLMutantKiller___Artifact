let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with undefined spec', function(done) {
        // Create a rule instance
        const originalRegex = /undefined-test/gim;
        const rule = new _spacl_core.Rule(originalRegex);
        
        // Clone with undefined spec (should fall back to this.regex)
        const clonedRule = rule.clone(undefined);
        
        // Verify the cloned rule uses the original regex
        assert.strictEqual(clonedRule.regex.source, originalRegex.source, 'Should use original regex when spec is undefined');
        assert.strictEqual(clonedRule.regex.flags, originalRegex.flags, 'Should preserve original flags when spec is undefined');
        
        done();
    });
});