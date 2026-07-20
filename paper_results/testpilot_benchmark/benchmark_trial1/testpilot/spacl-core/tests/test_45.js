let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow with array-like arguments', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            let verbs = ['create', 'update', 'delete'];
            
            // Pass the array directly instead of using spread operator
            let result = rule.allow(verbs);
            
            // Test that the method works with array arguments
            assert.strictEqual(result, rule, 'allow() should work with array arguments');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});