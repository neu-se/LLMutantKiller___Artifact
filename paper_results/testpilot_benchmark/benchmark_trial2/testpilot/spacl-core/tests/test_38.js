let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow - method chaining', function(done) {
        // Create a new Rule instance
        let rule = new _spacl_core.Rule();
        
        // Test method chaining
        rule.allow('read').allow('write').allow('execute');
        
        // Verify all verbs were added through chaining
        assert.strictEqual(rule.verbs['read'], true);
        assert.strictEqual(rule.verbs['write'], true);
        assert.strictEqual(rule.verbs['execute'], true);
        
        done();
    });
});