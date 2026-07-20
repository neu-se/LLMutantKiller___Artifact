let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.matches - complex paths', function(done) {
        try {
            let policy = new _spacl_core.Policy();
            
            // Test with nested paths
            let result1 = policy.matches('/api/v1/users/123/profile', { userId: 123 });
            assert.strictEqual(typeof result1, 'boolean');
            
            // Test with query-like paths
            let result2 = policy.matches('/search?q=test&limit=10', { query: 'test' });
            assert.strictEqual(typeof result2, 'boolean');
            
            // Test with special characters
            let result3 = policy.matches('/files/document%20name.pdf', {});
            assert.strictEqual(typeof result3, 'boolean');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});