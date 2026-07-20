let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for with empty name', function(done) {
        try {
            const rule1 = (context) => true;
            
            // Test with empty string name
            const policy = _spacl_core.Policy.for('', rule1);
            
            // Should still create a policy even with empty name
            assert(policy !== null, 'Policy should not be null');
            assert(policy !== undefined, 'Policy should not be undefined');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});