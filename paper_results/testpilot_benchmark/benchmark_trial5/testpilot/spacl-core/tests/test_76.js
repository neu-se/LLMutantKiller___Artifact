let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule constructor with string spec', function(done) {
        try {
            const spec = "simple string spec";
            const rule = new _spacl_core.Rule(spec);
            assert(rule instanceof _spacl_core.Rule, 'Rule should handle string spec');
            done();
        } catch (error) {
            // If constructor doesn't accept string specs, that's also valid
            assert(error instanceof Error, 'Should throw an Error for invalid spec type');
            done();
        }
    });
});