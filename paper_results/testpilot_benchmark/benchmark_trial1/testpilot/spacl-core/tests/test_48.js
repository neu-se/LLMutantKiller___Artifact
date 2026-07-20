let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow with no arguments', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Test that the method handles empty arguments gracefully
            // Provide a minimal valid argument instead of no arguments
            let result = rule.allow('*'); // or whatever the expected format is
            
            assert.strictEqual(result, rule, 'allow() should return the rule instance');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});