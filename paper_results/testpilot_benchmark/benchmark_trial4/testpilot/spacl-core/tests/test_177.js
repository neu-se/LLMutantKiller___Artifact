let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with multiple method chaining', function(done) {
        // Test chaining multiple methods as shown in examples
        const rule = _spacl_core.Rule.for('/user/+').allow('put', 'post', 'delete');
        assert(rule instanceof _spacl_core.Rule, 'Should handle multiple methods in allow');
        done();
    });
});