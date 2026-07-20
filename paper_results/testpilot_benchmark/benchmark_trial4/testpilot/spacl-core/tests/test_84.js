let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow with array-like arguments', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            let verbs = ['create', 'update', 'delete'];
            let result = rule.allow(...verbs);
            
            // Test that spread operator works with allow method
            assert.strictEqual(result, rule, 'allow() should work with spread operator');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});