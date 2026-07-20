let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with custom spec', function(done) {
        // Create a rule with initial regex
        const originalRule = new _spacl_core.Rule(/original-pattern/);
        
        // Add some verbs
        originalRule.verbs['PUT'] = true;
        originalRule.verbs['DELETE'] = false;
        originalRule.verbs['PATCH'] = true;
        
        // Clone with a different spec (using string instead of RegExp)
        const newSpec = 'new-pattern';
        const clonedRule = originalRule.clone(newSpec);
        
        // Verify the cloned rule has the new regex, not the original
        assert.strictEqual(clonedRule.regex.toString(), new RegExp(newSpec).toString());
        assert.notStrictEqual(clonedRule.regex.toString(), originalRule.regex.toString());
        
        // Verify the verbs are still copied from original
        assert.strictEqual(clonedRule.verbs['PUT'], true);
        assert.strictEqual(clonedRule.verbs['DELETE'], false);
        assert.strictEqual(clonedRule.verbs['PATCH'], true);
        
        done();
    });
});