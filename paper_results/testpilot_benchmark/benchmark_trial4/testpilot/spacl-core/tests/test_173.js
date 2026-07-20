let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with string spec', function(done) {
        // Test creating a rule with a string specification
        const spec = '/user/:name';
        const rule = _spacl_core.Rule.for(spec);
        assert(rule instanceof _spacl_core.Rule, 'Should create Rule instance with string spec');
        done();
    });

    })