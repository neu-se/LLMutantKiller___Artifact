let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.matches - empty path', function(done) {
        try {
            let policy = new _spacl_core.Policy();
            
            // Test with empty path
            let result = policy.matches('', {});
            
            assert.strictEqual(typeof result, 'boolean');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});