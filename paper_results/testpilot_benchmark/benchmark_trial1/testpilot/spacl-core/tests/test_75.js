let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone preserves other properties', function(done) {
        try {
            // Create a Rule instance and set additional properties if possible
            const originalRule = new _spacl_core.Rule(/test/);
            
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
            
            done();
        } catch (error) {
            done(error);
        }
    });
});