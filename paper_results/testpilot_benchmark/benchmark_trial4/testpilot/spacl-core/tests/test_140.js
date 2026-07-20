let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with custom spec', function(done) {
        // Create a rule instance with an initial regex
        const originalRegex = /original-pattern/i;
        const rule = new _spacl_core.Rule(originalRegex);
        
        // Define a custom spec for cloning
        const customRegex = /custom-pattern/gm;
        const clonedRule = rule.clone(customRegex);
        
        // Verify the cloned rule is a separate instance
        assert.notStrictEqual(rule, clonedRule, 'Cloned rule should be a different instance');
        
        // Verify the cloned rule uses the custom spec
        assert.strictEqual(clonedRule.regex.source, customRegex.source, 'Cloned rule should use custom regex source');
        assert.strictEqual(clonedRule.regex.flags, customRegex.flags, 'Cloned rule should use custom regex flags');
        
        // Verify original rule is unchanged
        assert.strictEqual(rule.regex.source, originalRegex.source, 'Original rule regex should be unchanged');
        
        done();
    });

    })