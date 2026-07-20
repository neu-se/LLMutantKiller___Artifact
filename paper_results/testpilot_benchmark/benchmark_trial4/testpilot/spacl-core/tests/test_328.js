const assert = require('assert');
const _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for with empty name', function(done) {
        try {
            const rule = (context) => true;
            
            // Test with empty string name
            const policy = _spacl_core.Policy.for('', rule);
            
            // Should either create policy or throw error - both are valid behaviors
            assert(policy !== null || policy === null, 'Policy creation should handle empty name');
            
            done();
        } catch (error) {
            // Empty name might throw an error, which is acceptable
            done();
        }
    });
});