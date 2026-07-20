let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with empty verbs', function(done) {
        // Create a rule with no verbs set
        const originalRule = new _spacl_core.Rule(/empty-test/);
        
        const clonedRule = originalRule.clone();
        
        // Verify regex is copied
        assert.strictEqual(clonedRule.regex.toString(), originalRule.regex.toString());
        
        // Verify verbs object exists but is empty
        assert.strictEqual(typeof clonedRule.verbs, 'object');
        assert.strictEqual(Object.keys(clonedRule.verbs).length, 0);
        
        done();
    });
});