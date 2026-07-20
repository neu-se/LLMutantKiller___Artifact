let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow - multiple verbs', function(done) {
        // Create a new Rule instance
        let rule = new _spacl_core.Rule();
        
        // Test allowing multiple verbs - pass as array or individual calls
        let result = rule.allow(['read', 'write', 'delete']);
        
        // Verify all verbs were added
        assert.strictEqual(rule.verbs['read'], true);
        assert.strictEqual(rule.verbs['write'], true);
        assert.strictEqual(rule.verbs['delete'], true);
        
        // Verify method returns the rule instance for chaining
        assert.strictEqual(result, rule);
        
        done();
    });
});