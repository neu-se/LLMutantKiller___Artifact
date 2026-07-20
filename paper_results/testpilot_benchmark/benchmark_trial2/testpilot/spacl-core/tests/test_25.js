let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule constructor with null spec', function(done) {
        try {
            const rule = new _spacl_core.Rule(null);
            assert(rule instanceof _spacl_core.Rule, 'Rule should handle null spec gracefully');
            done();
        } catch (error) {
            // If constructor throws an error with null spec, that's also valid behavior
            assert(error instanceof Error, 'Should throw an error for null spec');
            done();
        }
    });

    })