let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for creates a rule with the given spec', function(done) {
        // Test that Rule.for creates a rule object with the provided spec
        const rule = _spacl_core.Rule.for('/user/+');
        
        assert(rule !== null, 'Rule should not be null');
        assert(rule !== undefined, 'Rule should not be undefined');
        assert(typeof rule === 'object', 'Rule should be an object');
        
        done();
    });
});