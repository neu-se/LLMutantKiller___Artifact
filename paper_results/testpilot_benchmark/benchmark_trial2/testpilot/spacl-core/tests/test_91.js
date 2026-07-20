let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with empty verbs', function(done) {
        // Create a rule with no verbs set
        const originalRule = new _spacl_core.Rule(/empty-verbs/);
        
        // Clone the rule
        const clonedRule = originalRule.clone();
        
        // Verify the clone works even with empty verbs
        assert.strictEqual(clonedRule.regex.toString(), originalRule.regex.toString());
        assert.notStrictEqual(clonedRule, originalRule);
        
        // Verify verbs object exists but is empty/independent
        assert.notStrictEqual(clonedRule.verbs, originalRule.verbs);
        
        done();
    });
});