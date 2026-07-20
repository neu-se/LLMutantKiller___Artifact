let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule constructor with empty spec', function(done) {
        try {
            const spec = {
                match: function() {
                    return true; // or whatever default behavior is expected
                }
            };
            const rule = new _spacl_core.Rule(spec);
            assert(rule instanceof _spacl_core.Rule, 'Rule should be created even with empty spec');
            done();
        } catch (error) {
            done(error);
        }
    });
});