let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone preserves independence', function(done) {
        // Create a rule instance
        const originalRegex = /independence-test/;
        const rule = new _spacl_core.Rule(originalRegex);
        
        // Clone the rule
        const clonedRule = rule.clone();
        
        // Modify the original rule's regex (if possible) or other properties
        // This test ensures that changes to one don't affect the other
        const newRegex = /modified-pattern/;
        const anotherClone = rule.clone(newRegex);
        
        // Verify that the first clone is unaffected by the second clone operation
        assert.strictEqual(clonedRule.regex.source, originalRegex.source, 'First clone should remain unchanged');
        assert.strictEqual(anotherClone.regex.source, newRegex.source, 'Second clone should have new regex');
        
        // Verify all instances are independent
        assert.notStrictEqual(rule, clonedRule, 'Rule and first clone should be independent');
        assert.notStrictEqual(rule, anotherClone, 'Rule and second clone should be independent');
        assert.notStrictEqual(clonedRule, anotherClone, 'Both clones should be independent');
        
        done();
    });
});