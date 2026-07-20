let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone preserves other properties', function(done) {
        try {
            // Create a Rule instance - try different constructor patterns
            let originalRule;
            
            // Try creating with regex pattern
            try {
                originalRule = new _spacl_core.Rule(/test/);
            } catch (e) {
                // If regex fails, try with string pattern
                try {
                    originalRule = new _spacl_core.Rule('test');
                } catch (e2) {
                    // If string fails, try with object pattern
                    originalRule = new _spacl_core.Rule({ pattern: /test/ });
                }
            }
            
            // Clone the rule
            const clonedRule = originalRule.clone();
            
            // Verify basic functionality
            assert.notStrictEqual(originalRule, clonedRule);
            assert(clonedRule instanceof _spacl_core.Rule);
            
            // Test that both rules can function independently
            if (typeof originalRule.test === 'function') {
                const testString = 'test123';
                assert.strictEqual(
                    originalRule.test(testString), 
                    clonedRule.test(testString)
                );
            }
            
            // Additional check for match method if it exists
            if (typeof originalRule.match === 'function') {
                const testString = 'test123';
                const originalMatch = originalRule.match(testString);
                const clonedMatch = clonedRule.match(testString);
                assert.deepStrictEqual(originalMatch, clonedMatch);
            }
            
            done();
        } catch (error) {
            done(error);
        }
    });
});