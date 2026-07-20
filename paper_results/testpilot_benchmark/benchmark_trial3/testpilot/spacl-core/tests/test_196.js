let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for creates a Rule instance', function(done) {
        // Test that Rule.for returns a Rule instance
        const rule = _spacl_core.Rule.for('/user/+');
        assert(rule instanceof _spacl_core.Rule, 'Rule.for should return a Rule instance');
        done();
    });
});