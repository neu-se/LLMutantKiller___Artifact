let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny with multiple verbs', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            let result = rule.deny('read', 'write', 'delete');
            
            // Verify the rule object is returned for chaining
            assert.strictEqual(result, rule);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});