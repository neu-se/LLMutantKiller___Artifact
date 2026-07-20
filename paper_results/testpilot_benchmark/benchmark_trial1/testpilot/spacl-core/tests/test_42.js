let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow - duplicate verbs', function(done) {
        try {
            // Create a new Rule instance
            let rule = new _spacl_core.Rule();
            
            // Check if the rule has a verbs property, if not initialize it
            if (!rule.verbs) {
                rule.verbs = {};
            }
            
            // Add a verb first
            rule.allow('read');
            assert.strictEqual(rule.verbs['read'], true);
            
            // Add the same verb again
            rule.allow('read');
            
            // Verify it's still true (no change)
            assert.strictEqual(rule.verbs['read'], true);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});