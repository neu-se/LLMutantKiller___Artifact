let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with empty spec', function(done) {
        // Test with empty spec
        const spec = {};
        const rule = _spacl_core.Rule.for(spec);
        
        // Verify that a Rule instance is returned even with empty spec
        assert(rule instanceof _spacl_core.Rule, 'Should return a Rule instance with empty spec');
        done();
    });

    })