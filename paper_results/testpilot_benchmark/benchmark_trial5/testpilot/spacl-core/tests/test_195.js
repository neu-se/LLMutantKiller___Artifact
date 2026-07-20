let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for can be chained with deny method', function(done) {
        // Test that the created rule can be used with deny method
        const rule = _spacl_core.Rule.for('/user/:name').deny('delete');
        assert(rule instanceof _spacl_core.Rule, 'Should return Rule instance after chaining deny');
        done();
    });
});