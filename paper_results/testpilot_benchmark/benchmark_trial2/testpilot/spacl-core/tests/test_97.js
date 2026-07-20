let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with default spec', function(done) {
        // Create a rule with a regex pattern
        const originalRule = new _spacl_core.Rule(/test-pattern/);
        
        // Add some verbs to the original rule
        originalRule.verbs['GET'] = true;
        originalRule.verbs['POST'] = false;
        
        // Clone the rule using the regex source as a string spec
        const clonedRule = originalRule.clone(originalRule.regex.source);
        
        // Verify the cloned rule has the same regex
        assert.strictEqual(clonedRule.regex.toString(), originalRule.regex.toString());
        
        // Verify the verbs are copied
        assert.strictEqual(clonedRule.verbs['GET'], true);
        assert.strictEqual(clonedRule.verbs['POST'], false);
        
        // Verify they are different objects
        assert.notStrictEqual(clonedRule, originalRule);
        assert.notStrictEqual(clonedRule.verbs, originalRule.verbs);
        
        done();
    });
})