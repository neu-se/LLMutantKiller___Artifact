```javascript
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

    it('test @spacl/core.Rule.prototype.clone with custom spec', function(done) {
        // Create a rule with initial regex
        const originalRule = new _spacl_core.Rule(/original-pattern/);
        
        // Add some verbs
        originalRule.verbs['PUT'] = true;
        originalRule.verbs['DELETE'] = false;
        originalRule.verbs['PATCH'] = true;
        
        // Clone with a different spec
        const newSpec = /new-pattern/;
        const clonedRule = originalRule.clone(newSpec);
        
        // Verify the cloned rule has the new regex, not the original
        assert.strictEqual(clonedRule.regex.toString(), newSpec.toString());
        assert.notStrictEqual(clonedRule.regex.toString(), originalRule.regex.toString());
        
        // Verify the verbs are still copied from original
        assert.deepStrictEqual(clonedRule.verbs, originalRule.verbs);
        
        // Verify independence - modifying clone doesn't affect original
        clonedRule.verbs['GET'] = true;
        assert.strictEqual(originalRule.verbs['GET'], undefined);
        
        done();
    });

    it('test @spacl/core.Rule.prototype.clone preserves all verb properties', function(done) {
        // Create a rule and populate with various verb configurations
        const originalRule = new _spacl_core.Rule(/api\/users/);
        originalRule.verbs['GET'] = true;
        originalRule.verbs['POST'] = false;
        originalRule.verbs['PUT'] = true;
        originalRule.verbs['DELETE'] = false;
        originalRule.verbs['HEAD'] = true;
        
        // Clone the rule
        const clonedRule = originalRule.clone();
        
        // Verify all verbs are preserved
        for (const verb in originalRule.verbs) {
            assert.strictEqual(clonedRule.verbs[verb], originalRule.verbs[verb], 
                `Verb ${verb} should be preserved in clone`);
        }
        
        // Verify modifying original doesn't affect clone
        originalRule.verbs['OPTIONS'] = true;
        assert.strictEqual(clonedRule.verbs['OPTIONS'], undefined);
        
        // Verify modifying clone doesn't affect original
        clonedRule.verbs['TRACE'] = false;
        assert.strictEqual(originalRule.verbs['TRACE'], undefined);
        
        done();
    });

    it('test @spacl/core.Rule.prototype.clone with empty verbs', function(done) {
        // Create a rule with no verbs set
        const originalRule = new _spacl_core.Rule(/empty-verbs/);
        
        // Clone the rule
        const clonedRule = original