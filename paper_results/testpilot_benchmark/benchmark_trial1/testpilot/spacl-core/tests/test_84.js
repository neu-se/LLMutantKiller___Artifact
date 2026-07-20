let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with default spec', function(done) {
        try {
            // Create a Rule instance with a string pattern instead of regex
            const originalRule = new _spacl_core.Rule('test\\d+');
            
            // Clone the rule using default spec (should use this.regex)
            const clonedRule = originalRule.clone();
            
            // Verify the clone is a different instance
            assert.notStrictEqual(originalRule, clonedRule);
            
            // Verify the clone is also a Rule instance
            assert(clonedRule instanceof _spacl_core.Rule);
            
            // Verify the regex is the same
            assert.strictEqual(originalRule.regex.toString(), clonedRule.regex.toString());
            
            done();
        } catch (error) {
            done(error);
        }
    });
});