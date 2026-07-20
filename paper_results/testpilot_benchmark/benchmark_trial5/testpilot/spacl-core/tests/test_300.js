let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.matches - null context', function(done) {
        try {
            let policy = new _spacl_core.Policy();
            
            // Test with null context
            let result = policy.matches('/test/path', null);
            
            assert.strictEqual(typeof result, 'boolean');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});