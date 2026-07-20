let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.matches - with context', function(done) {
        try {
            let policy = new _spacl_core.Policy();
            
            // Test with various context objects
            let ctx1 = { user: 'admin', role: 'administrator' };
            let result1 = policy.matches('/admin/dashboard', ctx1);
            assert.strictEqual(typeof result1, 'boolean');
            
            let ctx2 = { user: 'guest', role: 'visitor' };
            let result2 = policy.matches('/public/info', ctx2);
            assert.strictEqual(typeof result2, 'boolean');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});