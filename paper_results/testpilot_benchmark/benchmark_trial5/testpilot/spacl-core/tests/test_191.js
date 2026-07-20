let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for can be chained with allow method', function(done) {
        // Test that the created rule can be used with allow method
        const rule = _spacl_core.Rule.for('/user/+').allow('get');
        assert(rule instanceof _spacl_core.Rule, 'Should return Rule instance after chaining allow');
        done();
    });

    })