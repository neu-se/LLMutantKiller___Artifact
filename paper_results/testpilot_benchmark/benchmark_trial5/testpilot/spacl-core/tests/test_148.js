let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.matches - case sensitivity', function(done) {
        try {
            let rule = new _spacl_core.Rule('/API/Users', 'GET', 'allow');
            let ctx = { method: 'GET' };
            
            // Test case sensitivity
            let result1 = rule.matches('/API/Users', ctx);
            assert.strictEqual(result1, true, 'Should match exact case');
            
            let result2 = rule.matches('/api/users', ctx);
            assert.strictEqual(result2, false, 'Should not match different case');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});