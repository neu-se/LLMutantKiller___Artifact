let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow - single verb', function(done) {
        // Create a new Rule instance
        let rule = new _spacl_core.Rule();
        
        // Initialize verbs property if it doesn't exist
        if (!rule.verbs) {
            rule.verbs = {};
        }
        
        // Test allowing a single verb - ensure it's a string
        let verb = 'read';
        let result = rule.allow(verb);
        
        // Verify the verb was added
        assert.strictEqual(rule.verbs['read'], true);
        
        // Verify method returns the rule instance for chaining
        assert.strictEqual(result, rule);
        
        done();
    });
});