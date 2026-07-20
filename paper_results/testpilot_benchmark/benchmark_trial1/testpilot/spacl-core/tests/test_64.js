let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny with single verb', function(done) {
        try {
            // Try to create a rule with potential required parameters
            let rule;
            try {
                rule = new _spacl_core.Rule();
            } catch (e) {
                // If constructor fails, try with empty object or other common patterns
                rule = new _spacl_core.Rule({});
            }
            
            // Ensure the verb is a string and not undefined
            let verb = 'read';
            if (typeof verb !== 'string') {
                throw new Error('Verb must be a string');
            }
            
            let result = rule.deny(verb);
            
            // Verify the rule object is returned for chaining
            assert.strictEqual(result, rule);
            
            // Verify the deny method was called and configured properly
            assert(rule.verbs || rule._verbs || rule.deniedVerbs || rule.denied);
            done();
        } catch (error) {
            done(error);
        }
    });
});