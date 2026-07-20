let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone preserves verb modifications', function(done) {
        // Create original rule
        const originalRule = new _spacl_core.Rule(/test/);
        originalRule.verbs['GET'] = true;
        originalRule.verbs['POST'] = false;
        
        // Clone the rule
        const clonedRule = originalRule.clone();
        
        // Modify verbs in cloned rule
        clonedRule.verbs['GET'] = false;
        clonedRule.verbs['PUT'] = true;
        
        // Verify original rule is unchanged
        assert.strictEqual(originalRule.verbs['GET'], true);
        assert.strictEqual(originalRule.verbs['POST'], false);
        assert.strictEqual(originalRule.verbs['PUT'], undefined);
        
        // Verify cloned rule has the modifications
        assert.strictEqual(clonedRule.verbs['GET'], false);
        assert.strictEqual(clonedRule.verbs['POST'], false);
        assert.strictEqual(clonedRule.verbs['PUT'], true);
        
        done();
    });
});