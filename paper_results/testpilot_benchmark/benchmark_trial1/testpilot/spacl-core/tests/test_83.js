let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with custom spec', function(done) {
        try {
            // Create a Rule instance with an initial regex
            const originalRule = new _spacl_core.Rule(/original/);
            
            // Clone with a different regex spec (using string instead of regex)
            const customSpec = 'custom\\w*';
            const clonedRule = originalRule.clone(customSpec);
            
            // Verify the clone is a different instance
            assert.notStrictEqual(originalRule, clonedRule);
            
            // Verify the clone is also a Rule instance
            assert(clonedRule instanceof _spacl_core.Rule);
            
            // Verify the clone has the custom regex, not the original
            const expectedRegex = new RegExp(customSpec);
            assert.strictEqual(clonedRule.regex.toString(), expectedRegex.toString());
            assert.notStrictEqual(clonedRule.regex.toString(), originalRule.regex.toString());
            
            done();
        } catch (error) {
            done(error);
        }
    });
});