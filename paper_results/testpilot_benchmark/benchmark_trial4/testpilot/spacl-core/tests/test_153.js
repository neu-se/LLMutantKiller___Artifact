let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with string spec', function(done) {
        // Create a rule instance
        const originalRegex = /string-test/;
        const rule = new _spacl_core.Rule(originalRegex);
        
        // Clone with a string spec (should be converted to regex)
        const stringSpec = 'string-pattern';
        const clonedRule = rule.clone(stringSpec);
        
        // Verify the cloned rule exists and is independent
        assert.notStrictEqual(rule, clonedRule, 'Cloned rule should be a different instance');
        assert(clonedRule instanceof _spacl_core.Rule, 'Cloned rule should be an instance of Rule');
        
        // Verify the string was handled appropriately
        // (The exact behavior depends on how the Rule constructor handles strings)
        assert(clonedRule.regex, 'Cloned rule should have a regex property');
        
        done();
    });
});