let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone preserves all verbs', function(done) {
        // Create a rule and populate with multiple verbs
        const originalRule = new _spacl_core.Rule(/verb-test/);
        originalRule.verbs['GET'] = true;
        originalRule.verbs['POST'] = false;
        originalRule.verbs['PUT'] = true;
        originalRule.verbs['DELETE'] = false;
        originalRule.verbs['HEAD'] = true;
        originalRule.verbs['OPTIONS'] = false;
        
        // Clone the rule
        const clonedRule = originalRule.clone();
        
        // Verify all verbs are copied correctly
        for (const verb in originalRule.verbs) {
            assert.strictEqual(clonedRule.verbs[verb], originalRule.verbs[verb], 
                `Verb ${verb} should be copied correctly`);
        }
        
        // Verify modifying cloned verbs doesn't affect original
        clonedRule.verbs['GET'] = false;
        assert.strictEqual(originalRule.verbs['GET'], true);
        assert.strictEqual(clonedRule.verbs['GET'], false);
        
        done();
    });
});