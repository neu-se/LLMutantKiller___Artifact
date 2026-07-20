let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with string spec', function(done) {
        try {
            // Create a Rule instance
            const originalRule = new _spacl_core.Rule(/test/);
            
            // Clone with a string spec (should be converted to regex)
            const clonedRule = originalRule.clone('hello');
            
            // Verify the clone is a different instance
            assert.notStrictEqual(originalRule, clonedRule);
            
            // Verify the clone is also a Rule instance
            assert(clonedRule instanceof _spacl_core.Rule);
            
            // Verify the cloned rule has the expected regex pattern
            assert(clonedRule.regex instanceof RegExp);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});