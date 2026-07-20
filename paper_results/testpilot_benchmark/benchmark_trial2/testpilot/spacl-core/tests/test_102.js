let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with custom spec', function(done) {
        // Create a rule instance with an initial regex pattern
        let originalRule = new _spacl_core.Rule(/original/);
        
        // Clone the rule with a different regex spec (as string)
        let customSpec = '/custom\\w*/i';
        let clonedRule = originalRule.clone(customSpec);
        
        // Verify the clone is a different instance
        assert.notStrictEqual(originalRule, clonedRule);
        
        // Verify the clone has the custom regex pattern, not the original
        assert.strictEqual(clonedRule.regex.source, 'custom\\w*');
        assert.strictEqual(clonedRule.regex.flags, 'i');
        assert.notStrictEqual(clonedRule.regex.source, originalRule.regex.source);
        
        done();
    });
});