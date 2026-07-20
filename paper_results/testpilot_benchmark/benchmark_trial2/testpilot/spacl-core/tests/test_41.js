let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow - empty call', function(done) {
        // Create a new Rule instance
        let rule = new _spacl_core.Rule();
        
        // Get initial verbs state
        let initialVerbs = Object.keys(rule.verbs).length;
        
        // Call allow with empty array instead of no arguments
        let result = rule.allow([]);
        
        // Verify no verbs were added
        assert.strictEqual(Object.keys(rule.verbs).length, initialVerbs);
        
        // Verify method still returns the rule instance
        assert.strictEqual(result, rule);
        
        done();
    });
});