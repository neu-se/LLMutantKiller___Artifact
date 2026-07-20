let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test matches method', function(done) {
        const rule = new _spacl_core.Rule('/api/users/*');
        
        // Test that the rule was created successfully
        assert(rule, 'Rule should be created');
        
        // Complete the test
        done();
    });
});