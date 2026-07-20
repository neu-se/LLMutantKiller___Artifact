let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for creates a new Rule instance', function(done) {
        // Test with a simple spec object
        const spec = { name: 'testRule', condition: 'test' };
        const rule = _spacl_core.Rule.for(spec);
        
        // Verify that a Rule instance is returned
        assert(rule instanceof _spacl_core.Rule, 'Should return a Rule instance');
        done();
    });

    })