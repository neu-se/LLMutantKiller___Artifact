let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with default spec', function(done) {
        // Create a rule instance with a regex pattern
        let originalRule = new _spacl_core.Rule(/test\d+/);
        
        // Clone the rule using default spec (provide proper spec format)
        let clonedRule = originalRule.clone({ match: originalRule.regex });
        
        // Verify the clone is a different instance
        assert.notStrictEqual(originalRule, clonedRule);
        
        // Verify the clone has the same regex pattern
        assert.strictEqual(clonedRule.regex.source, originalRule.regex.source);
        assert.strictEqual(clonedRule.regex.flags, originalRule.regex.flags);
        
        done();
    });
});