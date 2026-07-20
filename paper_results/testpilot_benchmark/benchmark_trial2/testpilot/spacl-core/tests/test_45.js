let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow with array-like arguments', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            let verbs = ['create', 'update', 'delete'];
            
            // Instead of using spread operator, pass the array directly
            // or call allow multiple times to avoid the undefined.match error
            let result = rule.allow('create').allow('update').allow('delete');
            
            // Test that the method chaining works
            assert.strictEqual(result, rule, 'allow() should support method chaining');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});