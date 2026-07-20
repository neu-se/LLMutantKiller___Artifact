let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with null spec', function(done) {
        // Test with null spec
        const rule = _spacl_core.Rule.for(null);
        
        // Verify that a Rule instance is returned
        assert(rule instanceof _spacl_core.Rule, 'Should return a Rule instance with null spec');
        done();
    });

    })