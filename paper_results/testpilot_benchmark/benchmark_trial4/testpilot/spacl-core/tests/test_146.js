let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with empty verbs', function(done) {
        // Create rule with no verbs set
        const originalRule = new _spacl_core.Rule(/empty-verbs/);
        
        // Clone the rule
        const clonedRule = originalRule.clone();
        
        // Verify both have empty verbs objects
        assert.deepStrictEqual(clonedRule.verbs, {});
        assert.deepStrictEqual(originalRule.verbs, {});
        
        // Verify they are different objects
        assert.notStrictEqual(clonedRule.verbs, originalRule.verbs);
        
        done();
    });
});