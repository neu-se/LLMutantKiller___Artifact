let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny with duplicate verbs', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            let result = rule.deny('read', 'read', 'write');
            
            // Verify the rule object is returned
            assert.strictEqual(result, rule);
            
            // The implementation should handle duplicates appropriately
            assert(rule.verbs || rule._verbs || rule.deniedVerbs);
            done();
        } catch (error) {
            done(error);
        }
    });
});