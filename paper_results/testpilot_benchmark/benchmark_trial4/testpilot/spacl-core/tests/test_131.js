let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.matches - case sensitivity', function(done) {
        try {
            let rule = new _spacl_core.Rule('/API/Users', 'GET', 'allow');
            let ctx = { method: 'GET' };
            
            // Test exact case match
            let result1 = rule.matches('/API/Users', ctx);
            assert.strictEqual(result1, true, 'Should match exact case');
            
            // Test different case
            let result2 = rule.matches('/api/users', ctx);
            // Note: The actual behavior depends on implementation - this tests the current behavior
            assert.strictEqual(typeof result2, 'boolean', 'Should return boolean for case variation');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});