let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with default spec', function(done) {
        // Create a rule instance with a regex pattern
        const originalRegex = /test-pattern/gi;
        const rule = new _spacl_core.Rule(originalRegex);
        
        // Clone the rule using default spec (should use this.regex)
        const clonedRule = rule.clone();
        
        // Verify the cloned rule is a separate instance
        assert.notStrictEqual(rule, clonedRule, 'Cloned rule should be a different instance');
        
        // Verify the cloned rule is of the same type
        assert(clonedRule instanceof _spacl_core.Rule, 'Cloned rule should be an instance of Rule');
        
        // Verify the regex is preserved
        assert.strictEqual(clonedRule.regex.source, originalRegex.source, 'Regex source should be preserved');
        assert.strictEqual(clonedRule.regex.flags, originalRegex.flags, 'Regex flags should be preserved');
        
        done();
    });

    })