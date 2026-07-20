let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with default spec', function(done) {
        // Create a rule with a regex pattern
        const originalRule = new _spacl_core.Rule(/test-pattern/);
        
        // Add some verbs to the original rule
        originalRule.verbs['GET'] = true;
        originalRule.verbs['POST'] = false;
        
        // Clone the rule using default spec (should use this.regex)
        const clonedRule = originalRule.clone();
        
        // Verify the cloned rule has the same regex
        assert.strictEqual(clonedRule.regex.toString(), originalRule.regex.toString());
        
        // Verify the verbs are copied
        assert.deepStrictEqual(clonedRule.verbs, originalRule.verbs);
        
        // Verify they are different objects
        assert.notStrictEqual(clonedRule, originalRule);
        assert.notStrictEqual(clonedRule.verbs, originalRule.verbs);
        
        done();
    });
});